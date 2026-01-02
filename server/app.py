from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import uuid
from config import Config
from services.pdf_parser import extract_text_from_pdf
from services.ai_analyzer import AIAnalyzer

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "ResuMatch AI Backend"}), 200

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file provided"}), 400
    
    file = request.files['resume']
    job_description = request.form.get('job_description', '')

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(f"{uuid.uuid4()}_{file.filename}")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(filepath)
            
            # 1. Extract Text
            resume_text = extract_text_from_pdf(filepath)
            
            # 2. Analyze
            analyzer = AIAnalyzer(resume_text, job_description)
            results = analyzer.analyze()
            
            # Clean up file
            os.remove(filepath)
            
            return jsonify({
                "success": True,
                "data": results,
                "resume_preview": resume_text[:500] + "..." # First 500 chars
            }), 200

        except Exception as e:
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"error": "Invalid file type. Only PDF allowed."}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
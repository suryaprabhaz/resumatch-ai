import re
from collections import Counter

class AIAnalyzer:
    def __init__(self, resume_text, job_description):
        self.resume_text = resume_text.lower()
        self.job_description = job_description.lower()
        
        # Common tech keywords to look for (expandable)
        self.tech_keywords = {
            "python", "java", "react", "javascript", "typescript", "c++", "aws", "docker", 
            "kubernetes", "sql", "nosql", "flask", "django", "html", "css", "machine learning",
            "ai", "data analysis", "communication", "leadership", "agile", "scrum", "git"
        }

    def _extract_keywords(self, text):
        """Simple NLP extraction based on predefined dictionary and word frequency."""
        words = re.findall(r'\b\w+\b', text)
        # Filter intersection with tech keywords or assume words > 3 chars are potential skills
        # In a real heavy ML app, we would use Spacy Entity Recognition here.
        found_keywords = set(words) & self.tech_keywords
        return found_keywords

    def analyze(self):
        resume_skills = self._extract_keywords(self.resume_text)
        job_skills = self._extract_keywords(self.job_description)
        
        # If no job description specific skills found, fallback to generic comparison
        if not job_skills:
            job_skills = self.tech_keywords

        matching_skills = resume_skills.intersection(job_skills)
        missing_skills = job_skills.difference(resume_skills)
        
        # Calculate Score
        if len(job_skills) > 0:
            match_percentage = (len(matching_skills) / len(job_skills)) * 100
        else:
            match_percentage = 0
            
        # Cap score logic for realism (resume rarely matches 100%)
        match_percentage = min(round(match_percentage, 1), 100)

        # Generate Insights
        feedback = []
        if match_percentage >= 80:
            feedback.append("Excellent match! Your profile is highly aligned with this role.")
        elif match_percentage >= 50:
            feedback.append("Good potential. Focus on adding missing critical skills.")
        else:
            feedback.append("Low match. Consider tailoring your resume heavily for this specific JD.")

        if missing_skills:
            feedback.append(f"Critical missing keywords: {', '.join(list(missing_skills)[:5])}")

        return {
            "score": match_percentage,
            "matching_skills": list(matching_skills),
            "missing_skills": list(missing_skills),
            "total_skills_in_jd": len(job_skills),
            "feedback": feedback
        }
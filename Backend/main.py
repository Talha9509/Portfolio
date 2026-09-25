from fastapi import FastAPI
from pathlib import Path
from pypdf import PdfReader
import os
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel
import json
import ast
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()
my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API key is req")

client = Groq(api_key=my_api_key)

model = "openai/gpt-oss-120b"

class ChatRequest(BaseModel):
    question: str

def ask_candidate(question: str, parsedResume):
    system_prompt = f"""
    You are an AI assistant representing a job candidate.
    Below is everything you know about the candidate.
    {parsedResume}

    Rules:
    1. Answer only using this information.
    2. Never hallucinate.
    3. If information is unavailable, say "I don't have enough information to answer that."
    4. Be professional.
    5. Answer as if HR is interviewing this candidate.
    6. Give the answer strictly in paragraphs.
    """
    messages=[
        {
            "role":"system",
            "content":system_prompt
        },
        {
            "role":"user",
            "content":question
        }
    ]
    
    response = client.chat.completions.create(model=model, messages=messages)
    return response.choices[0].message.content

app = FastAPI()
frontend = os.getenv("FRONTEND")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", frontend],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/ask")
def askQuestions(request: ChatRequest):
    with open("parsedResume.json", "r", encoding="utf-8") as file:
        content = file.read()
        print(content)
        parsedResume = content

    parsedResumeJSON = json.loads(parsedResume)    
    answer = ask_candidate(request.question, parsedResumeJSON)
    return { "answer": answer }



# ResumePath = input("Enter the Path to Resume: ")

# def ParseResume(ResumePath):
#     pdfOrdoc = ResumePath.split(".")[-1]
#     if(pdfOrdoc == "pdf"):
#         reader = PdfReader(ResumePath)
#         resumeLength = len(reader.pages)
#         allPagesContent = ""
#         for i in range(resumeLength):
#             page = reader.pages[i]
#             if "/Annots" in page:
#                 for annotation in page["/Annots"]:
#                     subtype = annotation.get_object()["/Subtype"]
#                     if(subtype == "/Link"):
#                         # print(annotation.get_object())
#                         action = annotation.get_object()["/A"]
#                         if action["/Type"] == "/Action" and action["/URI"]:
#                             link = action["/URI"]
#                             # print(link)
#                             allPagesContent = allPagesContent + "\n" + link
#             pageContent = page.extract_text()
#             allPagesContent = allPagesContent + "\n" + pageContent
#     elif(pdfOrdoc == "docs" or "docx"):
#         return "No support for docs"
#     print()
#     print("------------------------")
#     print()
#     print(allPagesContent)
#     return allPagesContent  

# def getStructuredResume():
#     parsedResume = ParseResume(ResumePath) 
    
#     class Exp(BaseModel):
#         companyName: str
#         role: str
#         duration: str
#         description: list[str]
#         skillsUsed: list[str]
        
#     class Project(BaseModel):
#         title: str
#         toolsTechUsed: list[str]
#         liveLink: str | None = None
#         githubLink: str | None = None
#         description: list[str]
        
#     class Certification(BaseModel):
#         title: str
#         description: str
#         link: str
        
#     class Achievement(BaseModel):
#         title: str
#         description: str
#         link: str | None = None
        
#     class Resume(BaseModel):
#         name: str
#         email: str | None = None
#         phone: str | None = None
#         totalExp: int
#         skills: list[str]
#         experiences: list[Exp] | None = None
#         certifications: list[Certification] | None = None
#         projects: list[Project] | None = None
#         achievements: list[Achievement] | None = None
    
#     ResumeSchema = Resume.model_json_schema()

#     response_format = {
#         "type": "json_object"
#     }

#     system_prompt = f"""
#     You are an expert resume parser.
#     Extract information from the resume based on its meaning, not only based on exact section headings.

#     Different resumes may use different headings.
#     For example:
#     - Experience
#     - Professional Experience
#     - Work History
#     - Employment
#     - Internships

#     These may all contain relevant experience.

#     Skills may also appear in the skills section, work experience,
#     internships or projects.

#     Return ONLY valid JSON matching this schema:
#     {ResumeSchema}

#     Important rules:
#     1. Do not invent information.
#     2. If a value is not available, return null.
#     4. Include internships inside experiences.
#     5. Extract skills mentioned across the entire resume.
#     """

#     message_system = {
#         "role": "system",
#         "content": system_prompt
#     }

#     text = parsedResume
#     user_prompt = f"""
#     Parse the following resume:
#     {text}
#     """

#     message_user = {
#         "role": "user",
#         "content": user_prompt
#     }

#     messages = [message_system, message_user]

#     response = client.chat.completions.create(model=model, messages=messages, response_format=response_format)
#     structuredResume = response.choices[0].message.content
#     print()
#     print("-----------------")
#     print()
#     print(structuredResume)
#     return structuredResume


# class AddResumeRequest(BaseModel):
#     resumeJSON: str

# @app.post("/api/add/resume")
# def addResume(request: AddResumeRequest):
#     print("request.resumeJSON")
#     print(request.resumeJSON)
#     print(type(request.resumeJSON))
    
#     try:
#         resume_data = ast.literal_eval(request.resumeJSON)
#         print("resume_data")
#         print(resume_data)
#     except (ValueError, SyntaxError) as error:
#         raise HTTPException(status_code=400,detail="resumeJSON must be a valid object string") from error

#     with open("parsedResume.json", "w", encoding="utf-8") as file:
#         json.dump(resume_data, file, indent=2, ensure_ascii=False)

#     return { "message": "done"}
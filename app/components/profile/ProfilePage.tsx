import { useState } from "react"
import { Avatar } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Edit, Share2, Download } from "lucide-react"
import Image from "next/image"
import EditProfile from "./EditProfile"

const RenderCard = ({ title, content }) => {
  if (!content || content.length === 0) return null;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default function ProfilePage() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true)
  }

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false)
  }

  const workExperience = [
    {
      role: "Teaching Assistant",
      company: "Kadir Has University",
      period: "2019 - Now",
      location: "Istanbul, Türkiye",
      responsibilities: [
        "Phase Transitions and Renormalization Group Theory",
        "Master Class: New Developments in Quantum Technologies and Quantum Computing"
      ],
      images: [
        "/placeholder.svg?height=72&width=108",
        "/placeholder.svg?height=72&width=108"
      ]
    }
  ];

  const volunteering = [
    {
      role: "Volunteer Teacher",
      organization: "Local Community Center",
      period: "2019 - 2020",
      description: "Taught basic computer skills to senior citizens."
    }
  ];

  const education = [
    {
      degree: "B.S. in Computer Science",
      school: "University of Technology",
      period: "2016 - 2020",
      location: "New York, NY"
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2021"
    }
  ];

  const projects = [
    {
      name: "E-commerce Platform",
      description: "Developed a full-stack e-commerce platform using MERN stack."
    }
  ];

  const sideProjects = [
    {
      name: "Weather App",
      description: "Created a weather application using React and OpenWeatherMap API."
    }
  ];

  const publications = [
    {
      title: "Introduction to React Hooks",
      publisher: "Tech Blog",
      date: "2022"
    }
  ];

  const honors = [
    {
      title: "Employee of the Year",
      issuer: "Tech Co.",
      date: "2021"
    }
  ];

  const contact = {
    email: "john.doe@email.com",
    phone: "+1 (123) 456-7890",
    linkedin: "linkedin.com/in/johndoe"
  };

  return (
    <div className="tailwind">
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outline" size="icon" onClick={handleEditProfileClick}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit profile</span>
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share profile</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download profile</span>
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <img src="/placeholder.svg?height=128&width=128" alt="Profile picture" className="rounded-full" />
          </Avatar>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">Software Developer</p>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-muted-foreground">
            Passionate software developer with experience in web development and cloud technologies.
            Always eager to learn new technologies and solve complex problems.
          </p>
        </section>

        <RenderCard
          title="Work Experience"
          content={
            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-lg">{job.role} at {job.company}</h3>
                  <div className="flex text-sm text-muted-foreground mb-2">
                    <span className="mr-8">{job.period}</span>
                    <span>{job.location}</span>
                  </div>
                  <ul className="list-disc list-inside mb-4">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm">{resp}</li>
                    ))}
                  </ul>
                  {job.images && job.images.length > 0 && (
                    <div className="flex gap-4">
                      {job.images.map((img, idx) => (
                        <div key={idx} className="relative h-[72px] w-auto">
                          <Image
                            src={img}
                            alt={`Work experience image ${idx + 1}`}
                            width={108}
                            height={72}
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          }
        />

        <RenderCard
          title="Volunteering"
          content={
            <div className="space-y-4">
              {volunteering.map((vol, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{vol.role} at {vol.organization}</h3>
                  <div className="text-sm text-muted-foreground mb-2">{vol.period}</div>
                  <p className="text-sm">{vol.description}</p>
                </div>
              ))}
            </div>
          }
        />

        <RenderCard
          title="Education"
          content={
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <div className="text-sm text-muted-foreground mb-2">{edu.school}</div>
                  <div className="flex text-sm text-muted-foreground">
                    <span className="mr-8">{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <RenderCard
          title="Certifications"
          content={
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <div className="text-sm text-muted-foreground">{cert.issuer} - {cert.date}</div>
                </div>
              ))}
            </div>
          }
        />

        <RenderCard
          title="Projects"
          content={
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          }
        />

        <RenderCard
          title="Side Projects"
          content={
            <div className="space-y-4">
              {sideProjects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          }
        />

        <RenderCard
          title="Publications"
          content={
            <div className="space-y-4">
              {publications.map((pub, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{pub.title}</h3>
                  <div className="text-sm text-muted-foreground">{pub.publisher} - {pub.date}</div>
                </div>
              ))}
            </div>
          }
        />

        <RenderCard
          title="Honors & Awards"
          content={
            <div className="space-y-4">
              {honors.map((honor, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{honor.title}</h3>
                  <div className="text-sm text-muted-foreground">{honor.issuer} - {honor.date}</div>
                </div>
              ))}
            </div>
          }
        />

        <RenderCard
          title="Contact"
          content={
            <div className="space-y-2">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>LinkedIn:</strong> {contact.linkedin}</p>
            </div>
          }
        />

        {isEditProfileOpen && (
          <EditProfile onClose={handleCloseEditProfile} />
        )}
      </div>
    </div>
  )
}

"use client"
import { useState, useRef, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { GripVertical, Image as ImageIcon, List, Link, Paperclip, X, Upload, Edit as EditIcon, Camera } from "lucide-react"
import { Separator } from "@/app/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog"
import Image from 'next/image'

type Section = "General" | "Work Experience" | "Volunteering" | "Education" | "Certification" | "Projects" | "Side Projects" | "Publications" | "Honors" | "Contact"

interface EditProfileProps {
  onClose: () => void;
}

export default function EditProfile({ onClose }: EditProfileProps) {
  const [profileImage, setProfileImage] = useState("/PlaceHolderAvatar.png?height=100&width=100")
  const [activeSection, setActiveSection] = useState<Section>("General")
  const [sections, setSections] = useState<Section[]>([
    "General", "Work Experience", "Volunteering", "Education", "Certification", "Projects", "Side Projects", "Publications", "Honors", "Contact"
  ])
  const [isAddingWorkExperience, setIsAddingWorkExperience] = useState(false)
  const [isAddingVolunteering, setIsAddingVolunteering] = useState(false)
  const [isAddingEducation, setIsAddingEducation] = useState(false)
  const [isAddingCertification, setIsAddingCertification] = useState(false)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [isAddingSideProject, setIsAddingSideProject] = useState(false)
  const [isAddingPublication, setIsAddingPublication] = useState(false)
  const [isAddingHonor, setIsAddingHonor] = useState(false)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [isAttachmentPopupOpen, setIsAttachmentPopupOpen] = useState(false)
  const [attachments, setAttachments] = useState<string[]>([])

  const [generalState, setGeneralState] = useState({
    name: "John Doe",
    url: "www.calmmarketing.com/johndoe",
    headline: "",
    about: ""
  })

  const [workExperienceState, setWorkExperienceState] = useState({
    title: "",
    company: "",
    location: "",
    url: "",
    from: "",
    to: "",
    description: ""
  })

  const [volunteeringState, setVolunteeringState] = useState({
    title: "",
    organization: "",
    location: "",
    url: "",
    from: "",
    to: "",
    description: ""
  })

  const [educationState, setEducationState] = useState({
    degree: "",
    institution: "",
    location: "",
    url: "",
    from: "",
    to: "",
    description: ""
  })

  const [certificationState, setCertificationState] = useState({
    name: "",
    organization: "",
    issued: "",
    expires: "",
    description: ""
  })

  const [projectState, setProjectState] = useState({
    title: "",
    client: "",
    year: "",
    link: "",
    description: ""
  })

  const [sideProjectState, setSideProjectState] = useState({
    title: "",
    client: "",
    year: "",
    link: "",
    description: ""
  })

  const [publicationState, setPublicationState] = useState({
    title: "",
    publisher: "",
    date: "",
    url: "",
    description: ""
  })

  const [honorState, setHonorState] = useState({
    title: "",
    issuer: "",
    date: "",
    url: "",
    description: ""
  })

  const [contactState, setContactState] = useState({
    platform: "",
    url: "",
    platformName: "",
    username: ""
  })

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const removeImage = () => {
    setProfileImage("/PlaceHolderAvatar.png?height=100&width=100")
  }

  const onDragEnd = (result : any) => {
    if (!result.destination) {
      return
    }

    const newSections = Array.from(sections)
    const [reorderedItem] = newSections.splice(result.source.index, 1)
    newSections.splice(result.destination.index, 0, reorderedItem)

    setSections(newSections)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAttachments([...attachments, file.name])
      setIsAttachmentPopupOpen(false)
    }
  }

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralState(prev => ({ ...prev, [name]: value }))
  }

  const handleWorkExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setWorkExperienceState(prev => ({ ...prev, [name]: value }))
  }

  const handleVolunteeringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setVolunteeringState(prev => ({ ...prev, [name]: value }))
  }

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEducationState(prev => ({ ...prev, [name]: value }))
  }

  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCertificationState(prev => ({ ...prev, [name]: value }))
  }

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProjectState(prev => ({ ...prev, [name]: value }))
  }

  const handleSideProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSideProjectState(prev => ({ ...prev, [name]: value }))
  }

  const handlePublicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPublicationState(prev => ({ ...prev, [name]: value }))
  }

  const handleHonorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setHonorState(prev => ({ ...prev, [name]: value }))
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setContactState(prev => ({ ...prev, [name]: value }))
  }

  const renderSectionContent = (section: Section) => {
    const addButton = (onClick : any) => (
      <Button variant="outline" size="sm" onClick={onClick}>
        Add
      </Button>
    )

    const descriptionArea = (
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Add description" className="mt-2" />
        <div className="flex justify-start gap-2 mt-2">
          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Link className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )

    const attachmentButton = (
      <Dialog open={isAttachmentPopupOpen} onOpenChange={setIsAttachmentPopupOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">
            <Paperclip className="h-4 w-4 mr-2" />
            Add attachment
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Add Attachment</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Input type="file" className="hidden" id="file-upload" onChange={handleFileUpload} />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
              </Label>
            </div>
            {attachments.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Uploaded Files:</h3>
                <ul>
                  {attachments.map((attachment, index) => (
                    <li key={index} className="flex items-center justify-between py-2">
                      <span>{attachment}</span>
                      <Button variant="ghost" size="sm">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )

    const actionButtons = (onCancel : any) => (
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onCancel}>Save</Button>
      </div>
    )

    switch (section) {
      case "General":
        return (
          <div className="space-y-6 relative">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Image src={profileImage} alt="Profile" width={96} height={96} className="rounded-full object-cover" />
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-white">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="name">Name Surname</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={generalState.name} 
                    onChange={handleGeneralChange}
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input 
                    id="url" 
                    name="url"
                    value={generalState.url} 
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input 
                id="headline" 
                name="headline"
                value={generalState.headline} 
                onChange={handleGeneralChange} 
                placeholder="Enter your headline" 
              />
            </div>
            <div>
              <Label htmlFor="about">About you</Label>
              <Textarea 
                id="about" 
                name="about"
                value={generalState.about} 
                onChange={handleGeneralChange} 
                rows={4} 
                placeholder="Tell us about yourself" 
              />
            </div>
            <Button className="w-full">Done</Button>
          </div>
        )
      case "Work Experience":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingWorkExperience(true))}
            </div>
            <Separator />
            {isAddingWorkExperience ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title*</Label>
                    <Input 
                      id="title" 
                      name="title"
                      value={workExperienceState.title} 
                      onChange={handleWorkExperienceChange} 
                      placeholder="Enter title" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company*</Label>
                    <Input 
                      id="company" 
                      name="company"
                      value={workExperienceState.company} 
                      onChange={handleWorkExperienceChange} 
                      placeholder="Enter company" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" placeholder="https://" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from">From*</Label>
                    <Select>
                      <SelectTrigger id="from">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="to">To*</Label>
                    <Select>
                      <SelectTrigger id="to">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {descriptionArea}
                {attachmentButton}
                {actionButtons(() => setIsAddingWorkExperience(false))}
              </div>
            ) : (
              <p>No work experience added yet. Click &apos;Add&apos; to add new work experience.</p>
            )}
          </div>
        )
      case "Volunteering":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingVolunteering(true))}
            </div>
            <Separator />
            {isAddingVolunteering ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title*</Label>
                    <Input 
                      id="title" 
                      name="title"
                      value={volunteeringState.title} 
                      onChange={handleVolunteeringChange} 
                      placeholder="Enter title" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization*</Label>
                    <Input 
                      id="organization" 
                      name="organization"
                      value={volunteeringState.organization} 
                      onChange={handleVolunteeringChange} 
                      placeholder="Enter organization" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" placeholder="https://" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from">From*</Label>
                    <Select>
                      <SelectTrigger id="from">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="to">To*</Label>
                    <Select>
                      <SelectTrigger id="to">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {descriptionArea}
                {attachmentButton}
                {actionButtons(() => setIsAddingVolunteering(false))}
              </div>
            ) : (
              <p>No volunteering experience added yet. Click &apos;Add&apos; to add new volunteering experience.</p>
            )}
          </div>
        )
      case "Education":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingEducation(true))}
            </div>
            <Separator />
            {isAddingEducation ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree">Degree or license*</Label>
                    <Input id="degree" placeholder="Enter degree or license" />
                  </div>
                  <div>
                    <Label htmlFor="institution">Institution*</Label>
                    <Input id="institution" placeholder="Enter institution" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" placeholder="https://" />
                  </div>
                </div>
                <div  className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from">From*</Label>
                    <Select>
                      <SelectTrigger id="from">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="to">To*</Label>
                    <Select>
                      <SelectTrigger id="to">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {descriptionArea}
                {attachmentButton}
                {actionButtons(() => setIsAddingEducation(false))}
              </div>
            ) : (
              <p>No education added yet. Click &apos;Add&apos; to add new education.</p>
            )}
          </div>
        )
      case "Certification":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingCertification(true))}
            </div>
            <Separator />
            {isAddingCertification ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name*</Label>
                    <Input id="name" placeholder="Enter certification name" />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization*</Label>
                    <Input id="organization" placeholder="Enter organization" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issued">Issued*</Label>
                    <Select>
                      <SelectTrigger id="issued">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expires">Expires</Label>
                    <Select>
                      <SelectTrigger id="expires">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-expiration">No Expiration</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {descriptionArea}
                {attachmentButton}
                {actionButtons(() => setIsAddingCertification(false))}
              </div>
            ) : (
              <p>No certifications added yet. Click &apos;Add&apos; to add a new certification.</p>
            )}
          </div>
        )
      case "Projects":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingProject(true))}
            </div>
            <Separator />
            {isAddingProject ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title*</Label>
                    <Input id="title" placeholder="Enter title" />
                  </div>
                  <div>
                    <Label htmlFor="client">Client*</Label>
                    <Input id="client" placeholder="Enter client" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Year*</Label>
                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="link">Link to project</Label>
                    <Input id="link" placeholder="https://" />
                  </div>
                </div>
                {descriptionArea}
                {attachmentButton}
                {actionButtons(() => setIsAddingProject(false))}
              </div>
            ) : (
              <p>No projects added yet. Click &apos;Add&apos; to add a new project.</p>
            )}
          </div>
        )
      case "Side Projects":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingSideProject(true))}
            </div>
            <Separator />
            {isAddingSideProject ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title*</Label>
                    <Input id="title" placeholder="Enter title" />
                  </div>
                  <div>
                    <Label htmlFor="client">Client*</Label>
                    <Input id="client" placeholder="Enter client" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Year*</Label>
                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="link">Link to project</Label>
                    <Input id="link" placeholder="https://" />
                  </div>
                </div>
                {descriptionArea}
                {attachmentButton}
                {actionButtons(() => setIsAddingSideProject(false))}
              </div>
            ) : (
              <p>No side projects added yet. Click &apos;Add&apos; to add a new side project.</p>
            )}
          </div>
        )
      case "Publications":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingPublication(true))}
            </div>
            <Separator />
            {isAddingPublication ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title*</Label>
                    <Input id="title" placeholder="Enter title" />
                  </div>
                  <div>
                    <Label htmlFor="publisher">Publisher*</Label>
                    <Input id="publisher" placeholder="Enter publisher" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Select>
                      <SelectTrigger id="date">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" placeholder="https://" />
                  </div>
                </div>
                {descriptionArea}
                {attachmentButton}
                {actionButtons(() => setIsAddingPublication(false))}
              </div>
            ) : (
              <p>No publications added yet. Click &apos;Add&apos; to add a new publication.</p>
            )}
          </div>
        )
      case "Honors":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingHonor(true))}
            </div>
            <Separator />
            {isAddingHonor ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title*</Label>
                    <Input id="title" placeholder="Enter title" />
                  </div>
                  <div>
                    <Label htmlFor="issuer">Issuer*</Label>
                    <Input id="issuer" placeholder="Enter issuer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Select>
                      <SelectTrigger id="date">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" placeholder="https://" />
                  </div>
                </div>
                {descriptionArea}
                {attachmentButton}
                {actionButtons(() => setIsAddingHonor(false))}
              </div>
            ) : (
              <p>No honors added yet. Click &apos;Add&apos; to add a new honor.</p>
            )}
          </div>
        )
      case "Contact":
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => setIsAddingContact(true))}
            </div>
            <Separator />
            {isAddingContact ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select>
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="github">GitHub</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" placeholder="https://" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platformName">Name of Platform</Label>
                    <Input id="platformName" placeholder="Enter platform name" />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" />
                  </div>
                </div>
                {actionButtons(() => setIsAddingContact(false))}
              </div>
            ) : (
              <p>No contacts added yet. Click &apos;Add&apos; to add a new contact.</p>
            )}
          </div>
        )
      default:
        return (
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section}</h2>
              {addButton(() => {})}
            </div>
            <Separator />
            <p>Content for {section} section.</p>
          </div>
        )
    }
  }

  return (
    <div className="tailwind" style={{width: "100%"}}>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center shadow-lg">
        <div ref={popupRef} className="bg-white rounded-2xl shadow-lg w-full max-w-4xl h-[600px] flex overflow-hidden">
          <div className="w-64 bg-white border-r">
            <div className="h-full">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sections">
                  {(provided, snapshot) => (
                    <nav
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-1 p-4 ${snapshot.isDraggingOver ? 'bg-gray-50' : ''}`}
                    >
                      {sections.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-colors duration-200 ${
                                item === activeSection
                                  ? "bg-gray-200"
                                  : snapshot.isDragging
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-100"
                              }`}
                              onClick={() => setActiveSection(item as Section)}
                            >
                              <span>{item}</span>
                              <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                <GripVertical className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </nav>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-auto border-0" style={{borderColor: "#E4E4E7"}}>
            <div className="max-w-2xl mx-auto">
              {renderSectionContent(activeSection)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

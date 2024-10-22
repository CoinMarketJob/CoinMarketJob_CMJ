import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  GripVertical,
  Image as ImageIcon,
  List,
  Link,
  Plus,
} from "lucide-react";

type Section =
  | "General"
  | "Work Experience"
  | "Volunteering"
  | "Education"
  | "Certification"
  | "Projects"
  | "Side Projects"
  | "Publications"
  | "Honors"
  | "Contact";

interface EditProfileProps {
  onClose: () => void;
}

export default function EditProfile({ onClose }: EditProfileProps) {
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=100&width=100"
  );
  const [activeSection, setActiveSection] = useState<Section>("General");
  const [sections, setSections] = useState<Section[]>([
    "General",
    "Work Experience",
    "Volunteering",
    "Education",
    "Certification",
    "Projects",
    "Side Projects",
    "Publications",
    "Honors",
    "Contact",
  ]);

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
    setProfileImage("/placeholder.svg?height=100&width=100");
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newSections = Array.from(sections);
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);

    setSections(newSections);
  };

  const onDragUpdate = (update: any) => {
    if (!update.destination) {
      return;
    }

    const newSections = Array.from(sections);
    const [reorderedItem] = newSections.splice(update.source.index, 1);
    newSections.splice(update.destination.index, 0, reorderedItem);

    setSections(newSections);
  };

  const renderSectionContent = (section: Section) => {
    const addButton = (
      <Button variant="ghost" size="sm" className="absolute top-0 right-0">
        <Plus className="h-4 w-4" />
        Add
      </Button>
    );

    switch (section) {
      case "General":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -bottom-2 -right-2"
                  onClick={removeImage}
                >
                  Remove image
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="username">Username*</Label>
              <Input id="username" defaultValue="boyraz" />
            </div>
            <div>
              <Label htmlFor="displayName">Display name*</Label>
              <Input id="displayName" defaultValue="0xboyraz" />
              <div className="text-right text-sm text-gray-500">8 of 48</div>
            </div>
            <div>
              <Label htmlFor="occupation">What do you do?</Label>
              <Input id="occupation" placeholder="Architect, painter, etc" />
              <div className="text-right text-sm text-gray-500">0 of 32</div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Where you're based" />
              <div className="text-right text-sm text-gray-500">0 of 32</div>
            </div>
            <div>
              <Label htmlFor="pronouns">Pronouns</Label>
              <Input id="pronouns" placeholder="They/them, etc" />
              <div className="text-right text-sm text-gray-500">0 of 12</div>
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="https://example.com" />
              <div className="text-right text-sm text-gray-500">0 of 96</div>
            </div>
            <div>
              <Label htmlFor="about">About</Label>
              <Textarea id="about" rows={4} />
              <div className="flex justify-end gap-2 mt-2">
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
          </div>
        );
      default:
        return (
          <div className="space-y-4 relative">
            <h2 className="text-2xl font-bold">{section}</h2>
            <p>Content for {section} section.</p>
            {addButton}
          </div>
        );
    }
  };

  return (
    <div className="tailwind" style={{ width: "100%" }}>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
        <div ref={popupRef} className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[600px] flex overflow-hidden">
          <div className="w-64 bg-white border-r">
            <div className="h-full">
              <DragDropContext
                onDragEnd={onDragEnd}
                onDragUpdate={onDragUpdate}
              >
                <Droppable droppableId="sections">
                  {(provided, snapshot) => (
                    <nav
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-1 p-4 ${
                        snapshot.isDraggingOver ? "bg-gray-50" : ""
                      }`}
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
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab active:cursor-grabbing"
                              >
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
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-2xl mx-auto">
              {renderSectionContent(activeSection)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

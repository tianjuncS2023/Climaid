import React, { createContext, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

export interface Volunteer {
  name: string;
  role: string;
  avatar: ImageSourcePropType | string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  details: string;
  bring: string;
  joined: boolean;
  volunteers: Volunteer[];
}

const EventContext = createContext<{
  events: Event[];
  joinEvent: (id: string) => void;
  addEvent: (newEvent: Event) => void;
} | null>(null);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Clean-Up Day",
      date: "Thu 10:15 AM - 1:20 PM, Apr 20, 2025",
      location: "Mountain View, CA",
      details:
        "Make a visible difference in our community! Join us for Community Clean Up Day to restore the beauty of our neighborhood, reduce pollution, and create a cleaner environment for all. We invite volunteers of all ages to come together and help remove litter, beautify public spaces, and learn about waste reduction and recycling.",
      bring: "Trash bags, pickers, and other necessary cleaning supplies.",
      joined: false,
      volunteers: [
        {
          name: "me",
          role: "Unassigned role",
          avatar: require("@/assets/images/volunteer1.png"),
        },
        {
          name: "Alice",
          role: "Team Lead",
          avatar: require("@/assets/images/volunteer2.png"),
        },
        {
          name: "Bob",
          role: "Cleaner",
          avatar: require("@/assets/images/volunteer3.png"),
        },
        {
          name: "Charlie",
          role: "Logistics Coordinator",
          avatar: require("@/assets/images/volunteer4.png"),
        },
      ],
    },
    {
      id: "2",
      title: "Tree Planting Event",
      date: "Wed 09:20 AM - 11:20 AM, May 26, 2025",
      location: "Mountain View, CA",
      details:
        "Make a lasting impact on our environment! Join us for Community Tree Planting Day to restore green spaces, reduce CO₂, and create wildlife habitats. All ages welcome to plant native trees and learn about tree care!.",
      bring:
        "Comfortable outdoor clothing, gloves, and a reusable water bottle. All planting tools will be provided.",
      joined: false,
      volunteers: [
        {
          name: "me",
          role: "Unassigned role",
          avatar: require("@/assets/images/volunteer1.png"),
        },
        {
          name: "Micheal Ulasi",
          role: "Event Coordinator",
          avatar: require("@/assets/images/volunteer3.png"),
        },
        {
          name: "Cristofer",
          role: "Event Coordinator role",
          avatar: require("@/assets/images/volunteer4.png"),
        },
        {
          name: "David  Silbia",
          role: "Event Coordinator",
          avatar: require("@/assets/images/volunteer2.png"),
        },
      ],
    },
  ]);

  const joinEvent = (id: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, joined: true } : event
      )
    );
  };

  const addEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <EventContext.Provider value={{ events, joinEvent, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context)
    throw new Error("useEventContext must be used within EventProvider");
  return context;
};

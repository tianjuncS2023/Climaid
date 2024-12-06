import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./EventForm.css";

interface EventData {
  title: string;
  date: string;
  location: string;
  details: string;
  bring: string;
}

export function EventForm() {
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    date: "",
    location: "",
    details: "",
    bring: "",
  });

  const handleDateTimePress = () => {
    // 处理日期时间选择的逻辑
    console.log("Open date time picker");
  };

  return (
    <div className="event-form">
      <h1 className="form-title">Create Event</h1>

      <label className="form-label">Event Name</label>
      <input
        className="form-input"
        value={eventData.title}
        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
      />

      <label className="form-label">Date & Time</label>
      <div className="datetime-container" onClick={handleDateTimePress}>
        <input
          className="form-input date-input"
          value={eventData.date}
          placeholder="Select date and time"
          readOnly
        />
        <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
      </div>

      <label className="form-label">Location</label>
      <input
        className="form-input"
        value={eventData.location}
        onChange={(e) =>
          setEventData({ ...eventData, location: e.target.value })
        }
        placeholder="Enter location"
      />

      <label className="form-label">Details</label>
      <textarea
        className="form-input multiline"
        value={eventData.details}
        onChange={(e) =>
          setEventData({ ...eventData, details: e.target.value })
        }
        placeholder="Enter event details"
      />

      <label className="form-label">What to Bring</label>
      <textarea
        className="form-input multiline"
        value={eventData.bring}
        onChange={(e) => setEventData({ ...eventData, bring: e.target.value })}
      />
    </div>
  );
}

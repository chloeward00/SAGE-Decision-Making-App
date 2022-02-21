import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import daygridPlugin from "@fullcalendar/daygrid";
import { useRef } from "react";
import ResponsiveDrawer from "../../components/Dashboard/Drawer/SideDrawer";

const Calendar = () => {
  const calendarRef = useRef(null);

  const gridType = ""
  const swipe =  () => {
   
  }

  return (
      <>
    <ResponsiveDrawer/>  
    <FullCalendar
      innerRef={calendarRef}
      plugins={[timeGridPlugin,interactionPlugin]}
      editable
      selectable
      // when adding events with firebase
      events={[]}
  
      
    />
    </>
  );
};

export default Calendar;
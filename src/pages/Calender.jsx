import { useState, useEffect } from 'react';
import { FiCalendar, FiPlus, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';

// Helper functions for localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    type: 'meeting',
    location: '',
    participants: ''
  });

  // Load events and tasks from localStorage on component mount
  const [events, setEvents] = useState(() => 
    loadFromLocalStorage('calendarEvents', [
      {
        id: 1,
        title: 'Team Standup',
        date: '2023-06-15',
        time: '09:30',
        type: 'meeting',
        participants: ['John', 'Sarah', 'Mike']
      },
      {
        id: 2,
        title: 'Project Deadline',
        date: '2023-06-20',
        time: '17:00',
        type: 'deadline',
        description: 'Submit final project deliverables'
      },
      {
        id: 3,
        title: 'Client Meeting',
        date: '2023-06-22',
        time: '14:00',
        type: 'meeting',
        location: 'Conference Room A'
      }
    ])
  );

  const [tasks, setTasks] = useState(() => 
    loadFromLocalStorage('calendarTasks', [
      {
        id: 1,
        title: 'Review design mockups',
        dueDate: '2023-06-18',
        completed: false,
        priority: 'high'
      },
      {
        id: 2,
        title: 'Prepare quarterly report',
        dueDate: '2023-06-25',
        completed: false,
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Update project documentation',
        dueDate: '2023-06-30',
        completed: true,
        priority: 'low'
      }
    ])
  );

  // Save to localStorage whenever events or tasks change
  useEffect(() => {
    saveToLocalStorage('calendarEvents', events);
  }, [events]);

  useEffect(() => {
    saveToLocalStorage('calendarTasks', tasks);
  }, [tasks]);

  // Calendar navigation functions
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Get days for current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Handle adding new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    const participantsArray = newEvent.participants 
      ? newEvent.participants.split(',').map(p => p.trim())
      : [];
    
    const newEventObj = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      ...(newEvent.location && { location: newEvent.location }),
      ...(participantsArray.length > 0 && { participants: participantsArray })
    };
    
    setEvents([...events, newEventObj]);
    setShowEventModal(false);
    setNewEvent({
      title: '',
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: '09:00',
      type: 'meeting',
      location: '',
      participants: ''
    });
  };

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Get events for selected date
  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  // Get tasks for selected date
  const getTasksForDate = (date) => {
    return tasks.filter(task => isSameDay(parseISO(task.dueDate), date));
  };

  // Handle date selection
  const handleDateClick = (day) => {
    setSelectedDate(day);
    setNewEvent(prev => ({
      ...prev,
      date: format(day, 'yyyy-MM-dd')
    }));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <FiCalendar className="text-blue-500 text-xl mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Calendar</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              setShowEventModal(true);
              setNewEvent(prev => ({
                ...prev,
                date: format(selectedDate, 'yyyy-MM-dd')
              }));
            }}
            className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiPlus className="mr-1" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Main Calendar Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Calendar View */}
        <div className="md:w-2/3 p-4 overflow-y-auto">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiChevronLeft className="text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button 
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day, i) => {
              const dayEvents = getEventsForDate(day);
              const dayTasks = getTasksForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);

              return (
                <div
                  key={i}
                  onClick={() => handleDateClick(day)}
                  className={`min-h-24 p-2 border rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50 border-blue-300' : 'border-gray-200 hover:bg-gray-50'
                  } ${!isCurrentMonth ? 'opacity-50' : ''}`}
                >
                  <div className="text-right">
                    <span className={`inline-block rounded-full w-6 h-6 text-center leading-6 ${
                      isSameDay(day, new Date()) ? 'bg-blue-500 text-white' : ''
                    }`}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  <div className="mt-1 space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id}
                        className="text-xs p-1 rounded truncate bg-blue-100 text-blue-800"
                      >
                        {event.time} {event.title}
                      </div>
                    ))}
                    {dayTasks.slice(0, 2).map(task => (
                      <div 
                        key={task.id}
                        className={`text-xs p-1 rounded truncate ${
                          task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.completed ? '✓ ' : ''}{task.title}
                      </div>
                    ))}
                    {(dayEvents.length + dayTasks.length) > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayEvents.length + dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Selected Day Details */}
        <div className="md:w-1/3 p-4 border-l border-gray-200 bg-white overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h3>

          {/* Events Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">Events</h4>
              <button 
                onClick={() => {
                  setShowEventModal(true);
                  setNewEvent(prev => ({
                    ...prev,
                    date: format(selectedDate, 'yyyy-MM-dd')
                  }));
                }}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                + Add Event
              </button>
            </div>
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-2">
                {getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between">
                      <h5 className="font-medium">{event.title}</h5>
                      <span className="text-sm text-gray-500">{event.time}</span>
                    </div>
                    {event.location && (
                      <p className="text-xs text-gray-500 mt-1">📍 {event.location}</p>
                    )}
                    {event.participants && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Participants:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {event.participants.map((participant, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {participant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No events scheduled</p>
            )}
          </div>

          {/* Tasks Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">Tasks Due</h4>
            </div>
            {getTasksForDate(selectedDate).length > 0 ? (
              <div className="space-y-2">
                {getTasksForDate(selectedDate).map(task => (
                  <div 
                    key={task.id} 
                    className={`p-3 border rounded-lg flex items-start ${
                      task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <button 
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`w-4 h-4 mt-0.5 mr-2 rounded-full border ${
                        task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}
                    ></button>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h5 className={`font-medium ${
                          task.completed ? 'text-green-800 line-through' : 'text-gray-800'
                        }`}>
                          {task.title}
                        </h5>
                        {task.priority === 'high' && !task.completed && (
                          <span className="text-xs text-red-500">High</span>
                        )}
                      </div>
                      {!task.completed && (
                        <button 
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="text-xs text-blue-500 hover:text-blue-700 mt-1"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No tasks due</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold">Add New Event</h3>
              <button 
                onClick={() => setShowEventModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                  <option value="reminder">Reminder</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (optional)</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Participants (comma separated, optional)</label>
                <input
                  type="text"
                  value={newEvent.participants}
                  onChange={(e) => setNewEvent({...newEvent, participants: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John, Sarah, Mike"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
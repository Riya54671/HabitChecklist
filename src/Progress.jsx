import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaDumbbell, FaSpa, FaRunning, FaBed, FaSwimmer, FaBook,
  FaAppleAlt, FaBicycle, FaLeaf, FaMusic, FaPaintBrush, FaUtensils, FaSmile, FaLaptop, FaDog, FaFire
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Icon mapping for string-to-component rendering
const iconMap = {
  FaDumbbell: <FaDumbbell color="#1976d2" />,
  FaSpa: <FaSpa color="#1976d2" />,
  FaRunning: <FaRunning color="#1976d2" />,
  FaBed: <FaBed color="#1976d2" />,
  FaSwimmer: <FaSwimmer color="#1976d2" />,
  FaBook: <FaBook color="#1976d2" />,
  FaAppleAlt: <FaAppleAlt color="#1976d2" />,
  FaBicycle: <FaBicycle color="#1976d2" />,
  FaLeaf: <FaLeaf color="#1976d2" />,
  FaMusic: <FaMusic color="#1976d2" />,
  FaPaintBrush: <FaPaintBrush color="#1976d2" />,
  FaUtensils: <FaUtensils color="#1976d2" />,
  FaSmile: <FaSmile color="#1976d2" />,
  FaLaptop: <FaLaptop color="#1976d2" />,
  FaDog: <FaDog color="#1976d2" />,
  FaFire: <FaFire color="#1976d2" />,
};

// Mock Data
const mockHabits = [
  { id: 1, name: "Sleep", details: "6/8 hrs", time: "10:00 am", completed: true, type: "Daily", icon: "FaBed" },
  { id: 2, name: "Read", details: "10 pages", time: "8:00 pm", completed: false, type: "Daily", icon: "FaBook" },
  { id: 3, name: "Exercise", details: "30 min", time: "7:00 am", completed: false, type: "Weekly", icon: "FaDumbbell" },
  { id: 4, name: "Meditate", details: "15 min", time: "6:30 am", completed: false, type: "Monthly", icon: "FaSpa" },
];
const filters = ["Daily", "Weekly", "Monthly"];

function getDateArray(centerDate = new Date(), range = 3) {
  const arr = [];
  for (let i = -range; i <= range; i++) {
    const d = new Date(centerDate);
    d.setDate(centerDate.getDate() + i);
    arr.push({
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
      isToday:
        d.getDate() === centerDate.getDate() &&
        d.getMonth() === centerDate.getMonth() &&
        d.getFullYear() === centerDate.getFullYear(),
    });
  }
  return arr;
}

const Home = () => {
  const today = new Date();
  const [selectedFilter, setSelectedFilter] = useState("Daily");
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const navigate = useNavigate();
  const dates = getDateArray(selectedDate, 2);

  // Load habits from localStorage on mount
 useEffect(() => {
  const storedHabits = JSON.parse(localStorage.getItem("habits"));
  if (storedHabits && storedHabits.length > 0) {
    setHabits(
      storedHabits.map(h =>
        typeof h.icon === "string"
          ? h
          : { ...h, icon: "FaSmile" }
      )
    );
  } else {
    setHabits(mockHabits);
    localStorage.setItem("habits", JSON.stringify(mockHabits));
  }
}, []);

  // Save habits to localStorage when habits change
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  }, [habits]);

  const handleToggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const handleNav = (section) => {
    if (section === "progress") {
      navigate("/progress");
    } else {
      alert(`Navigate to ${section}`);
    }
  };

  const filteredHabits = habits.filter((h) => h.type === selectedFilter);

  return (
    <Container>
      <Header>
        <Title>Wecome To Habitify</Title>
      </Header>
      <DateRowWrapper>
        <DateRow>
          {dates.map((date, idx) => (
            <DateCircle
              key={date.day + "-" + date.month}
              selected={date.isToday}
              onClick={() => setSelectedDate(new Date(date.year, date.month - 1, date.day))}
            >
              {date.day}
            </DateCircle>
          ))}
        </DateRow>
      </DateRowWrapper>
      <ContentWrapper>
        <Sidebar>
          <SidebarButton
            onClick={() => handleNav("progress")}
            tabIndex={0}
            aria-label="List"
          >
            <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.5 25C12.5 21.6848 13.817 18.5054 16.1612 16.1612C18.5054 13.817 21.6848 12.5 25 12.5H75C78.3152 12.5 81.4946 13.817 83.8388 16.1612C86.183 18.5054 87.5 21.6848 87.5 25V75C87.5 78.3152 86.183 81.4946 83.8388 83.8388C81.4946 86.183 78.3152 87.5 75 87.5H25C21.6848 87.5 18.5054 86.183 16.1612 83.8388C13.817 81.4946 12.5 78.3152 12.5 75V25ZM54.1667 33.3333C54.1667 32.2283 53.7277 31.1685 52.9463 30.3871C52.1649 29.6057 51.1051 29.1667 50 29.1667C48.8949 29.1667 47.8351 29.6057 47.0537 30.3871C46.2723 31.1685 45.8333 32.2283 45.8333 33.3333V66.6667C45.8333 67.7717 46.2723 68.8315 47.0537 69.6129C47.8351 70.3943 48.8949 70.8333 50 70.8333C51.1051 70.8333 52.1649 70.3943 52.9463 69.6129C53.7277 68.8315 54.1667 67.7717 54.1667 66.6667V33.3333ZM37.5 45.8333C37.5 44.7283 37.061 43.6685 36.2796 42.8871C35.4982 42.1057 34.4384 41.6667 33.3333 41.6667C32.2283 41.6667 31.1685 42.1057 30.3871 42.8871C29.6057 43.6685 29.1667 44.7283 29.1667 45.8333V66.6667C29.1667 67.7717 29.6057 68.8315 30.3871 69.6129C31.1685 70.3943 32.2283 70.8333 33.3333 70.8333C34.4384 70.8333 35.4982 70.3943 36.2796 69.6129C37.061 68.8315 37.5 67.7717 37.5 66.6667V45.8333ZM70.8333 58.3333C70.8333 57.2283 70.3943 56.1685 69.6129 55.3871C68.8315 54.6057 67.7717 54.1667 66.6667 54.1667C65.5616 54.1667 64.5018 54.6057 63.7204 55.3871C62.939 56.1685 62.5 57.2283 62.5 58.3333V66.6667C62.5 67.7717 62.939 68.8315 63.7204 69.6129C64.5018 70.3943 65.5616 70.8333 66.6667 70.8333C67.7717 70.8333 68.8315 70.3943 69.6129 69.6129C70.3943 68.8315 70.8333 67.7717 70.8333 66.6667V58.3333Z"/>
            </svg>
          </SidebarButton>
          <SidebarButton
            onClick={() => navigate("/add")}
            tabIndex={0}
            aria-label="Add Habit"
          >
            <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0C22.3828 0 0 22.3828 0 50C0 77.6172 22.3828 100 50 100C77.6172 100 100 77.6172 100 50C100 22.3828 77.6172 0 50 0ZM79.1602 54.1602C79.1602 56.4648 77.3047 58.3203 75 58.3203H58.3398V75C58.3398 77.3047 56.4844 79.1602 54.1797 79.1602H45.8398C43.5352 79.1602 41.6797 77.2852 41.6797 75V58.3398H25C22.6953 58.3398 20.8398 56.4648 20.8398 54.1797V45.8398C20.8398 43.5352 22.6953 41.6797 25 41.6797H41.6602V25C41.6602 22.6953 43.5156 20.8398 45.8203 20.8398H54.1602C56.4648 20.8398 58.3203 22.7148 58.3203 25V41.6602H75C77.3047 41.6602 79.1602 43.5352 79.1602 45.8203V54.1602Z"/>
            </svg>
          </SidebarButton>
         
        </Sidebar>
        <CenterColumn>
          <FilterRow>
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                active={selectedFilter === filter}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </FilterButton>
            ))}
          </FilterRow>
          <HabitsSection>
            <HabitsList>
              {filteredHabits.length === 0 && (
                <NoHabitsMsg>No habits for this filter.</NoHabitsMsg>
              )}
              {filteredHabits.map((habit) => (
                <HabitCard key={habit.id}>
                  <HabitIcon>
                    {typeof habit.icon === "string"
                      ? iconMap[habit.icon] || <FaSmile color="#1976d2" />
                      : <FaSmile color="#1976d2" />}
                  </HabitIcon>
                  <HabitInfo>
                    <HabitName>{habit.name}</HabitName>
                    <HabitDetails>
                      <span>{habit.details}</span>
                      <span>•</span>
                      <span>{habit.time}</span>
                    </HabitDetails>
                  </HabitInfo>
                  <CheckBox
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => handleToggleHabit(habit.id)}
                    aria-label="Mark habit as complete"
                  />
                </HabitCard>
              ))}
            </HabitsList>
          </HabitsSection>
        </CenterColumn>
        <StreakBox>
          <AnimatedFire>
            <FaFire size={96} />
          </AnimatedFire>
          <StreakCount>10</StreakCount>
          <StreakLabel>Days of Streak</StreakLabel>
        </StreakBox>
      </ContentWrapper>
    </Container>
  );
};

export default Home;

// Styled Components

const Container = styled.div`
  background: #ffe4b5;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const Title = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 2.6rem;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #222;
  letter-spacing: 2px;
`;

const DateRowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 0;
  margin-bottom: 24px;
`;

const DateRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  background: #fff8e1;
  border-radius: 24px;
  padding: 18px 40px;
  margin-top: 0;
  box-shadow: 0 2px 12px #ffe0b2;
`;

const DateCircle = styled.div`
  width: 56px;
  height: 56px;
  background: ${({ selected }) => (selected ? "#1976d2" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#1976d2")};
  border: 2px solid #1976d2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: ${({ selected }) => (selected ? "0 0 0 2px #ff9800" : "none")};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  margin: 24px 0 8px 0;
  justify-content: center;
  width: 100%;
`;
const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active"
})`
  background: ${({ active }) => (active ? "#ffb74d" : "#fff")};
  color: #d84315;
  border: none;
  border-radius: 16px;
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? "0 2px 8px #ffecb3" : "none")};
  transition: background 0.2s;
`;
const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  margin-top: 16px;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 0;
  margin-left: 32px;
  border-radius: 40px;
  border: 1px solid #333030;
  background: linear-gradient(180deg, rgba(255, 213, 0, 0.10) 0%, rgba(255, 213, 0, 0.40) 100%);
  backdrop-filter: blur(25px);
  box-shadow: 0 2px 12px #ffe0b2;
  height: auto;
  padding: 32px 20px 32px 36px;
  width: 80px;
`;

const SidebarButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  box-shadow: 0 2px 8px #ffecb3;
  cursor: pointer;
  margin-bottom: 32px;
  outline: none;
`;

const HabitsSection = styled.div`
  flex: 1;
  max-width: 600px;  
  min-width: 600px;   
  width: 600px;      
  background: #fffde7;
  border-radius: 16px;
  padding: 32px 32px;
  box-shadow: 0 2px 12px #ffe0b2;
  overflow: hidden;
  margin: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const HabitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 340px;
  overflow-y: auto;
  padding-right: 8px;
`;

const HabitCard = styled.div`
  display: flex;
  align-items: center;
  background: #e3f2fd;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 2px 8px #bbdefb;
  border: 2px solid #90caf9;
  transition: transform 0.2s, box-shadow 0.2s, rotate 0.2s;
  cursor: pointer;
  color: #111; /* Make text black */
  &:hover {
    transform: translateY(-6px) rotate(-2deg) scale(1.03);
    box-shadow: 0 6px 16px #90caf9;
  }
`;

const HabitIcon = styled.div`
  font-size: 2.8rem;
  margin-right: 24px;
  color: #1976d2;
  flex-shrink: 0;
`;

const HabitInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HabitName = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  color: #111;
`;

const HabitDetails = styled.div`
  color: #616161;
  font-size: 1.05rem;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 4px;
`;

const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  accent-color: #4caf50;
  margin-left: 12px;
  cursor: pointer;
`;

const NoHabitsMsg = styled.div`
  color: #888;
  text-align: center;
  margin-top: 32px;
  font-size: 1.1rem;
`;

const fireAnim = keyframes`
  0% { transform: scale(1) rotate(-2deg); filter: drop-shadow(0 0 0 #ff9800);}
  30% { transform: scale(1.1) rotate(2deg); filter: drop-shadow(0 0 8px #ff9800);}
  60% { transform: scale(1.05) rotate(-2deg); filter: drop-shadow(0 0 16px #ff9800);}
  100% { transform: scale(1) rotate(-2deg); filter: drop-shadow(0 0 0 #ff9800);}
`;
const StreakBox = styled.div`
  background: #ffe0b2;
  border-radius: 28px;
  padding: 56px 48px;
  min-width: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 16px #ffecb3;
  margin-left: 40px;
  justify-content: center;
  align-self: flex-start;
`;

const AnimatedFire = styled.div`
  color: #ff5722;
  animation: ${fireAnim} 1.2s infinite;
`;
const StreakCount = styled.div`
  color: #ff5722;
  font-size: 3.2rem;
  font-style: italic;
  font-weight: bold;
  margin-top: 18px;
`;

const StreakLabel = styled.div`
  color: #d84315;
  font-size: 1.4rem;
  font-style: italic;
  margin-top: 8px;
  text-align: center;
  `
;
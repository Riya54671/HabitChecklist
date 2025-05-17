
import React, { useState } from "react";
import styled from "styled-components";
import {
  FaDumbbell, FaSpa, FaRunning, FaBed, FaSwimmer, FaBook,
  FaAppleAlt, FaBicycle, FaLeaf, FaMusic, FaPaintBrush, FaUtensils, FaSmile, FaLaptop, FaDog
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Map icon names to components for display
const iconComponentMap = {
  FaDumbbell: FaDumbbell,
  FaSpa: FaSpa,
  FaRunning: FaRunning,
  FaBed: FaBed,
  FaSwimmer: FaSwimmer,
  FaBook: FaBook,
  FaAppleAlt: FaAppleAlt,
  FaBicycle: FaBicycle,
  FaLeaf: FaLeaf,
  FaMusic: FaMusic,
  FaPaintBrush: FaPaintBrush,
  FaUtensils: FaUtensils,
  FaSmile: FaSmile,
  FaLaptop: FaLaptop,
  FaDog: FaDog,
};

// Store icon as string name
const habitOptions = [
  { name: "Exercise", icon: "FaDumbbell" },
  { name: "Meditate", icon: "FaSpa" },
  { name: "Run", icon: "FaRunning" },
  { name: "Sleep", icon: "FaBed" },
  { name: "Swim", icon: "FaSwimmer" },
  { name: "Read", icon: "FaBook" },
  { name: "Eat Healthy", icon: "FaAppleAlt" },
  { name: "Cycle", icon: "FaBicycle" },
  { name: "Gardening", icon: "FaLeaf" },
  { name: "Music Practice", icon: "FaMusic" },
  { name: "Painting", icon: "FaPaintBrush" },
  { name: "Cook", icon: "FaUtensils" },
  { name: "Smile", icon: "FaSmile" },
  { name: "Coding", icon: "FaLaptop" },
  { name: "Walk Dog", icon: "FaDog" },
];

const categoryOptions = ["Daily", "Weekly", "Monthly"];

const AddHabit = () => {
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddHabit = () => {
    if (!selectedHabit || !category || !time || !hours) {
      setError("Please fill all fields.");
      return;
    }
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    const newHabit = {
      id: Date.now(),
      name: selectedHabit.name,
      details: `${hours} hrs`,
      time,
      completed: false,
      type: category,
      icon: selectedHabit.icon, // This is now a string!
    };
    localStorage.setItem("habits", JSON.stringify([...habits, newHabit]));
    navigate("/");
  };

  return (
    <Container>
      <Title>
        Add a new Habit <span role="img" aria-label="sparkles">✨</span>
      </Title>
      <Content>
        <Left>
          <SectionLabel>Habits</SectionLabel>
          <HabitGrid>
            {habitOptions.map((habit) => {
              const IconComp = iconComponentMap[habit.icon];
              return (
                <HabitIconBtn
                  key={habit.name}
                  selected={selectedHabit && selectedHabit.name === habit.name}
                  onClick={() => setSelectedHabit(habit)}
                  aria-label={habit.name}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <IconComp size={32} color="#222" />
                    <HabitName>{habit.name}</HabitName>
                  </div>
                </HabitIconBtn>
              );
            })}
          </HabitGrid>
        </Left>
        <Right>
          <FormLabel>Category</FormLabel>
          <Select
            value={category}
            onChange={e => setCategory(e.target.value)}
            aria-label="Select category"
          >
            <option value="">Select category</option>
            {categoryOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
          <FormLabel>Time</FormLabel>
          <Input
            type="text"
            value={time}
            onChange={e => setTime(e.target.value)}
            placeholder="e.g. 7:00 am"
          />
          <FormLabel>No of hours per day</FormLabel>
          <Input
            type="number"
            value={hours}
            onChange={e => setHours(e.target.value)}
            placeholder="e.g. 1"
            min="0"
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <AddButton onClick={handleAddHabit}>Add Habit</AddButton>
        </Right>
      </Content>
    </Container>
  );
};

export default AddHabit;

// Styled Components

const Container = styled.div`
  background: #ffe4b5;
  border: 2px solid #222;
  border-radius: 12px;
  padding: 32px 48px 48px 48px;
  width: 100vw;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 2.2rem;
  font-style: italic;
  font-weight: bold;
  margin: 16px 0 24px 0;
  color: #222;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  width: 100%;
  margin-top: 8px;
  align-items: flex-start;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 340px;
  max-width: 420px;
  width: 30vw;
`;

const SectionLabel = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: #222;
`;

const HabitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  width: 100%;
`;

const HabitIconBtn = styled.button`
  background: ${({ selected }) => (selected ? "#ffe082" : "#fff")};
  border: 2px solid #d1b36a;
  border-radius: 12px;
  width: 110px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
  transition: background 0.2s, border 0.2s;
  &:hover {
    background: #ffe082;
  }
`;

const HabitName = styled.span`
  font-size: 1rem;
  color: #222;
  margin-top: 6px;
  font-weight: 500;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 320px;
  max-width: 480px;
`;

const FormLabel = styled.label`
  font-size: 1.1rem;
  color: #222;
  margin-top: 12px;
  margin-bottom: 6px;
  font-style: italic;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1.5px solid #d1b36a;
  font-size: 1rem;
  margin-bottom: 12px;
  background: #fffde7;
  color: #222;
  outline: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1.5px solid #d1b36a;
  font-size: 1rem;
  margin-bottom: 12px;
  background: #fffde7;
  color: #222;
  outline: none;
`;

const AddButton = styled.button`
  margin-top: 18px;
  padding: 12px 0;
  background: #ffd54f;
  color: #222;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  font-size: 1.15rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffb300;
  }
`;

const ErrorMsg = styled.div`
  color: #d84315;
  font-size: 1rem;
  margin-bottom: 4px;
`;

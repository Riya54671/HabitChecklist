import React from "react";
import styled from "styled-components";
import { FaBook } from "react-icons/fa";

// Mock Data (reuse from Home.jsx)
const mockHabits = [
  { id: 1, name: "Sleep", progress: 0.4 },
  { id: 2, name: "Read", progress: 0.6 },
  { id: 3, name: "Exercise", progress: 0.5 },
  { id: 4, name: "Meditate", progress: 0.7 },
];

const Progress = () => {
  return (
    <Container>
    <Title>Progress</Title>
    <StatsGrid>
      <StatColumn>
        <StatBox color="#6fcf97">
          <StatNumber>5</StatNumber>
          <StatLabel>
            New Habits<br />Created
          </StatLabel>
        </StatBox>
        <StatBox color="#4fc3f7">
          <IconWrapper>
            <FaBook size={32} />
          </IconWrapper>
          <StatLabel>Most Followed<br />Habit</StatLabel>
        </StatBox>
      </StatColumn>
      <BarChart>
        {mockHabits.map((habit, idx) => (
          <BarWrapper key={habit.id}>
            <Bar>
              <BarFill style={{ height: `${habit.progress * 100}%` }} />
            </Bar>
            <BarLabel>{habit.name}</BarLabel>
          </BarWrapper>
        ))}
      </BarChart>
    </StatsGrid>
  </Container>
  );
};

export default Progress;

const Container = styled.div`
  background: #ffe4b5;
  border: 3px solid #222;
  border-radius: 12px;
  padding: 32px 0 24px 0;
  width: 100vw;                // Full viewport width
  min-height: 100vh;           // Full viewport height
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 2.1rem;
  font-style: italic;
  font-weight: bold;
  margin: 0 0 24px 0;
  color: #222;
`;
const StatsGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 90vw;
  max-width: 1400px;
  margin: 0 auto;
  gap: 40px;
`;


const StatBox = styled.div`
  background: ${props => props.color || "#eee"};
  border-radius: 16px;
  padding: 32px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 160px;
  justify-content: center;
  box-shadow: 0 2px 12px #e0e0e0;
`;

const StatNumber = styled.div`
  font-size: 2.6rem;
  font-style: italic;
  font-weight: bold;
  color: #222;
  margin-bottom: 8px;
`;


const StatColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 240px;
  max-width: 320px;
  flex: 0 0 260px;
`;

const StatLabel = styled.div`
  font-size: 1.3rem;
  color: #222;
  text-align: center;
  font-style: italic;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  color: #1976d2;
  margin-bottom: 12px;
`;

const BarChart = styled.div`
  background: #ff6f61;
  border-radius: 18px;
  padding: 36px 36px 24px 36px;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  min-height: 260px;
  gap: 48px;
  width: 100%;                
  min-width: 600px;           
  max-width: 1000px;
  box-sizing: border-box;
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  min-width: 80px;
`;

const Bar = styled.div`
  width: 32px;
  height: 140px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  border: 2px solid #1976d2;
`;

const BarFill = styled.div`
  width: 100%;
  background: #1976d2;
  border-radius: 0 0 12px 12px;
  transition: height 0.4s;
`;

const BarLabel = styled.div`
  margin-top: 14px;
  font-size: 1.1rem;
  color: #222;
  font-weight: 500;
  text-align: center;
  word-break: break-word;
`;
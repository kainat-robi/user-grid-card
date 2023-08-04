import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: gray;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
`;

const BrandName = styled.span`
  font-size: 24px;
`;

const Button = styled.button`
  background-color: #fff;
  color: #007bff;
  padding: 10px 20px;
  border: 2px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  &:disabled {
    background-color: #ccc;
    color: #888;
    cursor: not-allowed;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
`;

const UserCard = styled.div`
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: wheat;

  img {
    width: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  h3 {
    margin: 0;
    font-size: 20px;
    color: #007bff;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 18px;
  color: #007bff;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Navbar>
        <BrandName>My Brand</BrandName>
        <Button onClick={getUsers} disabled={loading}>
          Get Users
        </Button>
      </Navbar>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </UserCard>
          ))}
        </CardGrid>
      )}
    </Container>
  );
}

export default App;

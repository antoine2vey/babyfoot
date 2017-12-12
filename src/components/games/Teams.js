import React from 'react'
import styled from 'styled-components/native'

const Teams = ({ teams: [teamA, teamB] }) => (
  <Container>
    <Team>
      {teamA.members.map(member => (
        <TeamMember key={member._id}>
          <MemberAvatar source={{ uri: member.avatar }} />
          <TeamMemberName>
            {member.first_name} {member.last_name}
          </TeamMemberName>
        </TeamMember>
      ))}
    </Team>
    <Team>
      {teamB &&
        teamB.members.map(member => (
          <TeamMember key={member._id}>
            <MemberAvatar source={{ uri: member.avatar }} />
            <TeamMemberName>
              {member.first_name} {member.last_name}
            </TeamMemberName>
          </TeamMember>
        ))}
    </Team>
  </Container>
)

export default Teams

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 5px 0;
`

const Team = styled.View`
  flex: 1;
  padding-right: 10px;
  max-width: 50%;
  flex-basis: 50%;
`

const TeamMember = styled.View`
  margin: 4px 0;
  flex-direction: row;
  align-items: center;
`

const MemberAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20;
`

const TeamMemberName = styled.Text`
  font-weight: 600;
  color: black;
  margin-left: 8px;
  font-size: 12px;
`

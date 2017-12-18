import React from 'react'
import styled from 'styled-components/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import CardContainer from './CardContainer'

const Rules = ({ label, rules, selectRule }) => (
  <CardContainer labelText={label}>
    {rules.map(rule => (
      <Team
        key={rule._id}
        onPress={() => selectRule(rule._id)}
        activeOpacity={0.9}
      >
        <Logo source={{ uri: rule.icon }} resizeMode="center" />
        <TeamName>{rule.title}</TeamName>

        <SelectedOverlay selected={rule.selected}>
          <SelectedOverlayCircle>
            <Ionicon
              name="ios-checkmark"
              size={50}
              color="rgba(201, 70, 70, 1)"
              style={{ marginTop: 5 }}
            />
          </SelectedOverlayCircle>
        </SelectedOverlay>
      </Team>
    ))}
  </CardContainer>
)

const SelectedOverlayCircle = styled.View`
  background: #fff;
  height: 50px;
  width: 50px;
  border-radius: 25

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden
  
  shadow-color: #000
  shadow-offset: 2px 2px
  shadow-opacity: 1
  shadow-radius: 2px
`

const SelectedOverlay = styled.View`
  opacity: ${props => (props.selected ? 1 : 0)}
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, .8)
  border-radius: 6px

  display: flex;
  align-items: center;
  justify-content: center
`

const Team = styled.TouchableOpacity`
  background-color: #fff
  border-radius: 6px;
  padding: 10px;

  align-items: center;
  max-width: 32%;
  margin-right: 4px
  margin-bottom: 4px
  flex-basis: 32%;

  shadow-color: rgba(0,0,0,.5)
  shadow-offset: 4px 4px
  shadow-opacity: 0.25
  shadow-radius: 8px

  position: relative;
`

const Logo = styled.Image`
  width: 90px;
  height: 90px;
`

const TeamName = styled.Text`
  margin-top: 5px;
`

export default Rules

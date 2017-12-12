import React from 'react'
import moment from 'moment'
import 'moment/locale/fr'
import styled from 'styled-components/native'

const Date = ({ date }) => (
  <DateString>
    {moment(date)
      .format('LL')
      .toLocaleUpperCase()}
  </DateString>
)

export default Date

const DateString = styled.Text`
  font-weight: 600;
  margin: 5px 0;
  color: black;
  text-align: center;
`

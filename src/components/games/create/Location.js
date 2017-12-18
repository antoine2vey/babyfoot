import React from 'react'
import { FormLabel, FormInput } from 'react-native-elements'
import { View } from 'react-native'

const Location = ({ place, setPlace }) => (
  <View>
    <FormLabel labelStyle={{ color: '#fff', fontWeight: '300' }}>
      Lieu
    </FormLabel>
    <FormInput
      inputStyle={{ color: '#fff' }}
      containerStyle={{ borderBottomColor: '#fff', borderBottomWidth: 1.3 }}
      onChangeText={place => setPlace(place)}
      value={place}
    />
  </View>
)

export default Location

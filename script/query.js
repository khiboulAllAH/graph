export const query=`{
    user {
    firstName
    lastName
    email
    campus
    xp:transactions(where :{type:{_eq:"xp"}, eventId:{_eq:56}}){
    amount
    createdAt
    }
    grade:transactions(where :{type: {_eq:"level"},eventId:{_eq:56}}){
      path
      amount
    }
  }
}
`
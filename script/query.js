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
  skills:transactions (where : {type : {_ilike:"skill_%"},object:{type:{_eq:"project"}}} order_by:[{type:desc},{amount:desc}] distinct_on :type){
    type
    amount
  }
    }
}
`
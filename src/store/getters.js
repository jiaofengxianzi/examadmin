
export default {
    allCitys: state => state.citys,
    allVenues: state => state.venues,
    allRooms: state => state.rooms,
    allCourses: state => state.courses,
    allGrades: state => state.grades,
    allMajors: state => state.majors,
    allPlans: state => state.plans,
    allquestionsTypes: state => state.questionsTypes,
    objectiveTypes: state => {
        return state.questionsTypes.filter((item) => {
            return item.id == 5 || item.id == 6
        })
    },
    allAnswer:state => state.plans,
    allScore:state => state.score,
    allRoles:state => state.roles,
}



import {getInfo} from "@/api/user";

const getDefaultState = () => {
  return {
    quiz: '',
    template: '',
    examination:'',
    config:'',
    question:'',
    configdata:''
  }
};
const state = getDefaultState();
const mutations = {
  SET_QUIZ: (state, id) => {
    state.quiz = id
  },
  SET_TEMPLATE: (state, id) => {
    state.template=id
  },
  SET_EXAMINATION: (state, id) => {
    state.name = id
  },
  SET_QUESTION:(state,id)=>{
    state.question = id
  },
  SET_CONFIG:(state,id)=>{
    state.config = id
  },
  SET_CONFIGDATA:(state,data)=>{
    state.configdata = data
  }

};


export default {
  namespaced: true,
  state,
  mutations,
}

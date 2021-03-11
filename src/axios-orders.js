import axios from 'axios';

const instance=axios.create({
    baseURL:"https://react-burger007-9dc66-default-rtdb.firebaseio.com/"
})

export default instance;
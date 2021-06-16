import axios from 'axios';

// const Axios = axios.create({baseURL:"http://localhost:9000"})   // for debug
const Axios = axios.create({baseURL:"http://lab.cb301.icu:9000"})    // for production

export default Axios
import axios from 'axios';

export default function fetchPopularRepos (languages){
    let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+languages+
        '&sort=stars&order=desc&type=Repositories');
    
        return axios.get(encodedURI)
                .then((response)=>{
                    return response.data.items;
                })    
}
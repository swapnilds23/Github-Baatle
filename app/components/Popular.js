import React from 'react';
import PropTypes from 'prop-types';
import fetchPopularRepos from '../utils/api';

//Component to select language from the given array.
function SelectLanguage (props){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='language'>

            {languages.map(function (lang) {
                return(
                <li 
                key={lang}
                onClick={props.onSelect.bind(null, lang)}
                style={lang === props.selectedLanguage ? {color: '#d0021b'} :null}> 
                    {lang}
                </li>
                )})
            }

      </ul>
    )
}

//Proptypes are defined for SelectLanguage component.
SelectLanguage.propTypes ={
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

//Component to display Repository Grid.
function RepoGrid (props){
    return (
        <ul className='popular-list'>
            {props.repos.map((repo, index)=>{
               
         return(
               <li key={repo.name} className='popular-item'>
                    <div className='popular-rank'>
                        #{index+1}
                    </div>
                    <ul className='space-list-items'>
                        <li>
                            <img 
                               className='avatar'
                               src={repo.owner.avatar_url}
                               alt={'Avatar for' + repo.owner.login} />
                        </li>

                        <li>
                            <a href={repo.html_url}>
                                {repo.name}
                            </a>
                        </li>

                        <li>
                            @{repo.owner.login}
                        </li>

                        <li>
                            {repo.Stargazers_count} stars
                        </li>
                    </ul>
                </li>

               )
              
             }
            )}
        </ul>
    )
}


//Prop types for RepoGrid Components
RepoGrid.propTypes ={
    repos: PropTypes.array.isRequired
}

//Popular component which is rendering repository based on the selected language.
class Popular extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }
   
    componentDidMount(){
        
       this.updateLanguage(this.state.selectedLanguage);
            
    }

    updateLanguage(lang) {
        this.setState(function (){
            return {
                selectedLanguage: lang,
                repos:null
            }
        })

        fetchPopularRepos(lang)
            .then((repos)=>{
                this.setState(()=>{
                    return {
                        repos: repos}
                })
        })
    }

    render() {

        return (
        <div>
            <SelectLanguage
                selectedLanguage = {this.state.selectedLanguage}
                onSelect = {this.updateLanguage}
            
            />
            {
                !this.state.repos ?
                <p>LOADING</p>:
                <RepoGrid repos={this.state.repos} />
            }
           
        </div>
        )
    }
}

export default Popular;
import React from 'react';
import { render } from 'react-dom';
import './style.css';
import * as Axios from 'axios';

var resultData = []
var cnt  = 0

class DataTableColGroupDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sales: [
                { comments: '36', voteCount: '96', upvote: '40%', NewsProfile: 'Seemigly impossible switft programsh', side: 'fewbutripe.com' },
                { comments: '28', voteCount: '34', upvote: '30%', NewsProfile: 'Seemigly impossible switft programsh', side: 'fewbutripe.com' }
            ],
            users: [],
            apiData: [],
            upvote : 0
        };  

    }

    componentDidMount() {

        Axios.get('http://hn.algolia.com/api/v1/search_by_date')
            .then((response) => {
                this.setState({
                    apiData: response.data.hits
                });
                console.log('err',this.state.apiData)
                resultData = this.state.apiData
            })

    }

    buttonClick(){
       
        var table = document.getElementById("tableId");
        var rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
          var currentRow = table.rows[i];
         
          var createClickHandler = function(row) {
            return function() {
                console.log(i)
              var cell = row.getElementsByTagName("td")[i];
            
              console.log(cell.innerHTML === "23449512")
              console.log(typeof cell.innerHTML)
            };
          };

          currentRow.onclick = createClickHandler(currentRow);
        }
    }

    render() {

        var data = [
            {
                "comments": "acomment",
                "stroryid": "Dach Group",
                "clickbutton": 0
            },
            {
                "comments": "bcomment",
                "stroryid": "Bach Group",
                "clickbutton": 0
            },
         
        ];

        return (
            <div style={{ width: "100%", height: "100%" }} >
                <div style={{ width: "100%", height: "50%" }}>
                    <label style={{border: "3px solid blue", width:"100%", height: "100%", fontSize:20}}>
                        Sapient Assignment</label>
                    <table className="table" id="tableId">
                        <thead className="tableHeader">
                            <tr>
                                <th style={{ height: '50px' }}>Comments</th>
                                 <th style={{ height: '50px' }}>Story Id</th>
                                 <th style={{height:'50px'}}>Up Vote</th>
                                 <th style={{height:'50px'}}>News Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.apiData.map(obj => {
                                return (
                                    <tr>
                                        <td>
                                            {obj.num_comments}
                                        </td>
                                        <td id="story_id">
                                            {obj.story_id}
                                        </td>
                                        <td id="button">
                                            <button onClick={this.buttonClick}>^</button>
                                        </td>
                                        <td>
                                            {obj.comment_text}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <label>Line Graph : Votes vs Id</label><br/>
                    
                </div>
            </div>
        );
    }
}

render(<DataTableColGroupDemo />, document.getElementById('root'));

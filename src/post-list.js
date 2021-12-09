import React from 'react';

export default class PostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("https://gorest.co.in/public/v1/posts")
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
   )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    const containsErrorMessage = () => {
      return <div>Error: {error.message}</div>;
    };

    const isLoading = () => {
      return <div>Loading...</div>;
    };
    
    const results = () => {
      return (
          <div className="row justify-content-center m-0 ">
              <div className="col-lg-6 ">
                  {items.map((result,index) => (

                      <div className="card my-4 text-left" key={index} >
                          <div className="card-header ">
                            <h6>{index+1}. {result.title}</h6>
                          </div>
                          <div className="card-body"> {result.body}</div>
                      </div>

                  ))}

              </div>
          </div>

      )
    }

    if (error) return containsErrorMessage();
    return !isLoaded ? isLoading() : results();
  }
}
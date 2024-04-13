import "./Write.css";

function Write() {
  return (
    <>
      <div className="write">
        <img className="writeImg" src="https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <form className="writeForm">
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className="writeFileIcon fa-solid fa-plus"></i>
                </label>
                <input className="writeFile" type="file" id="fileInput"/>
                <input className="writeInput" type="text" placeholder="Title" autoFocus={true}/>
            </div>
            <div className="writeFormGroup">
                <textarea className="writeInput writeText" placeholder="Tell your story..."></textarea>
            </div>
            <button className="writeSubmit">Publish</button>
        </form>
      </div>
    </>
  );
}

export default Write;

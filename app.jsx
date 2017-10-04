class Model {
      constructor() {
            this.images = ["plane.svg"];
            this.index = 0;
            this.cont = 0;
            //this.checked = false;
            this.guests = [];
            this.inputValue = null;
            this.callback = null;
      }

      subscribe(render) {
            this.callback = render;
      }

      notify() {
            this.callback();
      }
      getImage() {
            return this.images[this.index];
      }
      addGuests(newGamer, index) {
            if (this.inputValue.value != null || this.inputValue.value != '') {
                  this.guests.push({
                        name: this.inputValue.value,
                        class: '',
                        id: this.cont + 1,
                        checked: false
                  });
                  this.index++;
                  this.inputValue.value = "";
                  this.notify();
            }
      }

      removeGuests(option) {
            this.guests = this.guests.filter(item => item !== option);
            this.notify();
      }

      getCheked(e, index) {
            this.guests[index].checked = (e.target.checked) ? true : false;
            this.guests[index].class = (e.target.checked) ? 'responded' : '';
            this.notify();
      }
}

const RegisterGuest = ({ title, model }) => {
      let guestList = model.guests.map((option, index) => {
            return (
                  <li key={index} className={option.class}>
                        {option.name}
                        <label htmlFor="">
                              {title}
                              <input type="checkbox" name={index} checked={option.checked} onChange={e => model.getCheked(e, index)}/>
                        </label>
                        <button onClick={() => model.removeGuests(option)}>remove</button>
                  </li>
            )
      });
      return (
            <div className="wrapper">
                  <header>
                        <h1>RSVP</h1>
                        <p> Registration App </p>
                        <form onSubmit={e => {
                              e.preventDefault();
                              model.addGuests(model.inputValue);
                        }}>
                              <input type="text" name="name" placeholder="Invite Someone" onChange={e => (model.inputValue = e.target)} />
                              <button type="submit" name="submit" value="submit">Submit</button>
                        </form>
                  </header>
                  <div className="main">
                        <h2>Invitees</h2>
                        <ul>{guestList}</ul>
                  </div>
            </div>
      );
}

let model = new Model();
let counter = 1;

let render = () => {
      console.log('render times: ', counter++);
      ReactDOM.render(
            <RegisterGuest title="Confirmed  " model={model} />,
            document.getElementById('container')
      );
};

model.subscribe(render);

render(); 
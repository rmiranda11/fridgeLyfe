import React from "react"

function About() {

    return (
        <div className="row">
            <div className="col-sm-12 abt">
                <div className="abt-div">
                    <h2 className="abt-title">Food is Knowledge</h2>
                    {/* <img className="abt-img" src="https://miro.medium.com/max/7914/1*S-H5dNe3M8GXI6UefaI9vQ.jpeg"></img> */}
                    <img className="abt-img" alt="World Food" src="https://tryveg.com/wp-content/uploads/2018/04/AdobeStock_73094846.jpeg"></img>
                    <h3 className="abt-intro">The home cooking game is a challenging experience. Shopping, carrying, storing, cooking, eating only to repeat it over and over again for the rest of your life. However, amazing benefits can be reaped in your future by sowing the right seeds. Take control of your health by improving the care of your body's main source of energy. Indulge in recipes carried on by your forefathers. Take on the challenge of dominating your diet and notice how fast your mood, energy, and savings will improve. Do your part in ending world hunger and protect our enviroment. Go that extra mile! Because at the end of the day... <br></br><br></br>
                    <b>You are what you eat.</b></h3>

                    <h4 className="sub-title abt-sub">Tips for Culinary Success</h4>
                    <ol className="abt-list">
                        <li>Shop Smart</li>
                        <p>It's better to make more frequent stops to grocery store throughout the week than to buy too much and waste it. Try to use all of your groceries before going back to the store.</p>
                        <li>Store Food Correctly</li>
                        <p>Potatoes, tomatoes, garlic, cucumbers and onions should never be refridgerated. Seperate foods that produce ethylene gas from apples, potatoes, leafy greens, and berries.</p>
                        <p><b>Foods that release ethylene:</b></p>
                        <ul className="sub-list">
                            <li>Bananas</li>
                            <li>Tomatoes</li>
                            <li>Cantaloupes</li>
                            <li>Peaches</li>
                            <li>Avocados</li>
                            <li>Pears</li>
                            <li>Green Onions</li>
                        </ul>
                        <li>Keep Fridge Organized</li>
                        <p>Arrange the food in your fridge using the FIFO method. First In First Out.</p>
                        <li>Eat Your Leftovers</li>
                        <p>Leftovers are great because you can eat your most fantastic meal yet again! There is scientific evidence showing that chemical reactions can take place in your food after cooking and produce new flavor profiles making your delightful dinner an even more exquisite one the next day. </p>
                        <li>Shake it or Lose it</li>
                        <p>Milk shakes and smoothies are the perfect way to use up your fruit and vegetables. Check out <a href="https://fitfoodiefinds.com/best-protein-shakes/"> FitFoodieFinds.com </a> for some great recipes.Add some honey or peanut butter to sweeten things up. </p>
                        <li className="freeze">Freeze!</li>
                        <p>Become heavily acquainted with your freezer. It is the best way to preserve meats.</p>
                        <p>Here's how long to keep food in the Freezer at 0°:</p>
                        <ul className="freeze-list">
                            <li>Cooked Meat: 2-3 months</li>
                            <li>Uncooked Meat: 4-12 months</li>
                            <li>Cooked Poultry: 4-5 months</li>
                            <li>Uncooked Poultry: 9-12 months</li>
                            <li>Soups & Stews: 2-3 months</li>
                        </ul>
                        <li>Pack - a - Lunch</li>
                        <p>This one offers the most relief to your wallet. By taking lunch from home rather than eating out can save you around $1,200 a month. It's also a good way to not leave leftovers behind.</p>
                    </ol>
                    <img className="abt-img-2"  alt="Happy Food" src="https://hub.umd.edu/sites/default/files/2019-08/image/cool_veggies.png"></img>
                </div>
            </div>
        </div>
    )
}

export default About
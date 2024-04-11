import React from "react";

export function Main({}) {
  return (
    <div>
      <aside>
        <p>
          Please give each possible menu item a rating from 1-10. (1 = Blegh!,
          10 = ADD THIS IMMEDIATELY!!!)
        </p>
        <table>
          <tr>
            <th>
              <img
                alt="burger"
                src="https://gardenavalleynews.org/wp-content/uploads/2014/04/Burger.jpg"
              />
            </th>
            <th>
              <img
                alt="steak"
                src="https://www.thespruceeats.com/thmb/X0Q76ZRZOBVryjd3QSr0gcsiIFA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GrilledFlatIronSteak-StevenMorrisPhotography-GettyImages-5c62f355c9e77c0001d32301.jpg"
              />
            </th>
            <th>
              <img
                alt="milkshake"
                src="https://previews.123rf.com/images/nikolayzaiarnyi/nikolayzaiarnyi1806/nikolayzaiarnyi180600005/102944365-chocolate-extreme-milkshake-with-brownie-cake-chocolate-paste-and-sweets-crazy-freakshake-food-trend.jpg"
              />
            </th>
          </tr>
          <tr>
            <th>Big Bang Burger</th>
            <th>Sirloin Showstopper</th>
            <th>Chocoholic Explosion Shake</th>
          </tr>
          <tr>
            <th>
              <input id="rating1" type="number" min="1" max="10" />
              <button onclick="rateItem(1)">Submit</button>
            </th>
            <th>
              <input id="rating2" type="number" min="1" max="10" />
              <button onclick="rateItem(2)">Submit</button>
            </th>
            <th>
              <input id="rating3" type="number" min="1" max="10" />
              <button onclick="rateItem(3)">Submit</button>
            </th>
          </tr>
          <tr>
            <th id="average1">Average Rating: TBA</th>
            <th id="average2">Average Rating: TBA</th>
            <th id="average3">Average Rating: TBA</th>
          </tr>
        </table>
      </aside>
      <div id="messageContainer"></div>
    </div>
  );
}

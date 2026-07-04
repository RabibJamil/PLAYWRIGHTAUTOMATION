import { test, expect, request } from '@playwright/test';
import ApiUtils from './utils/ApiUtils';

const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const emptyOrderPayload = {data:[],message:"No Orders"}
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new ApiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
    const body = JSON.stringify(emptyOrderPayload);
    await route.fulfill({
        status: 200,
        headers: {
            'content-type': 'application/json'
        },
        body
    });
})
await page.locator("button[routerlink*='myorders']").click();
await page.getByText("You have No Orders to show at this time.Please Visit Back Us").isVisible()
 
});
 
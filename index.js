const express = require('express')

const axios = require('axios')

const app = express() 
async function getAnswers(req,res)
{
    var votes = 1000;
    var maxrate = 0;
    var filtervotes = new Array();
    const r = await axios.get("https://jsonmock.hackerrank.com/api/food_outlets?city=Miami");
    var totalpages = r.data.total_pages;
    for(var i=1;i<=totalpages;i++)
    {
        console.log("page "+i);
        const url = "https://jsonmock.hackerrank.com/api/food_outlets?city=Miami&page="+i;
        const r1 = await axios.get(url);
        const data = r1.data.data;
        data.filter((item)=>{
            if(item.user_rating.votes > votes)
            {
                maxrate = Math.max(maxrate,item.user_rating.average_rating);
                filtervotes.push(item);
            }
        })
    }
    console.log(filtervotes);
    console.log(maxrate);
    const ratef = filtervotes.filter((item)=>{
        return item.user_rating.average_rating === maxrate;
    })
    console.log(ratef);
    ratef.sort((a, b) => b.user_rating.votes - a.user_rating.votes);
    return res.json(ratef[0].name);
}


async function getAns(req,res)
{
    var genre = "Animation";
    let ans = new Array();
    const r = await axios.get("https://jsonmock.hackerrank.com/api/tvseries");
    console.log(r.data.total_pages);
    var totalpages = r.data.total_pages;
    for(var i=1;i<=totalpages;i++)
    {
        const url = "https://jsonmock.hackerrank.com/api/tvseries?page="+i;
        const r1 = await axios.get(url);
        const data = r1.data.data;
        data.filter((item)=>{
            if(item.genre.includes(genre)==true)
            {
                ans.push(item);
            }
        });
    }
    ans.sort((a,b)=> b.imdb_rating - a.imdb_rating);
    var maxrate = ans[0].imdb_rating;
    var fans = ans.filter((item)=>{
         return item.imdb_rating === maxrate;
    })
    console.log(fans);
    fans.sort((a,b)=> a.name.localeCompare(b.name));
    res.json(fans[0]);

}



app.get('/api1',(req,res)=>{
    getAnswers(req,res);
})


app.get('/api2',(req,res)=>{
    getAns(req,res);
})



app.listen(5000)
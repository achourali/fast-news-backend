import { Injectable } from '@nestjs/common';
import path, { dirname } from 'path';
const puppeteer = require('puppeteer');
const fs = require('fs')
const pug = require('pug');
const pdf = require('html-pdf');
import { fileURLToPath } from 'url';


@Injectable()
export class NewsService {

    async getNews(keywords) {
        this.createPdf(keywords)
        return 'done'
    }


    async getTweets(keywords): Promise<Array<string>> {
        let url = `https://twitter.com/search?q=${encodeURI(keywords)}&src=typed_query&f=top`
        const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome" });
        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 2000 })
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.evaluate(() => {


            let onTopElement = document.querySelector('#layers')
            onTopElement.parentNode.removeChild(onTopElement)

            let searchBar: Element = document.querySelector('main');
            let i = 0;
            while (i < 6) {
                searchBar = searchBar.children[0]
                i++
            }
            searchBar.parentNode.removeChild(searchBar)
        });
        const elements = await page.$$('article')
        let twitterIds = []

        for (let i = 0; i < elements.length; i++) {

            let linkElement = (await (await elements[i].$('time')).$x('..'))[0]
            let elementLink = await page.evaluate(el => el.getAttribute('href'), linkElement)
            let elementId = elementLink.split('/').pop()
            twitterIds.push(elementId)
            await elements[i].screenshot({ path: `/tmp/${elementId}.png` })
        }
        await browser.close()
        return twitterIds;
    };




    async getRedditPosts(keywords): Promise<Array<{ community: string, reference: string }>> {

        let url = `https://www.reddit.com/search/?q=${encodeURI(keywords)}`
        const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome" });
        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 900 })
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            let onTopElement = document.querySelector('header')
            onTopElement.parentNode.removeChild(onTopElement)
        });
        const elements = await page.$$('div.Post')
        let elementsIds = []
        for (let i = 0; i < elements.length; i++) {
            let linkElement = await elements[i].$('a[data-click-id="timestamp"]')
            let elementLink = await page.evaluate(el => el.getAttribute('href'), linkElement)
            let elementId = { community: elementLink.split('/')[4], reference: elementLink.split('/')[6] }
            elementsIds.push(elementId)
            await elements[i].screenshot({ path: `/tmp/${elementId.community + elementId.reference}.png` })
        }
        await browser.close()
        return elementsIds;
    }




    async createPdf(keywords) {

        let twitterIds = await this.getTweets(keywords);
        let redditIds = await this.getRedditPosts(keywords);


        const compiledFunction = pug.compileFile(__dirname + '/pdfTemplate.pug');

        let html = compiledFunction({
            twitterIds: twitterIds,
            redditIds: redditIds,
            backgroundPath: __dirname + '/back1.jpeg'
        });
        


        let options = { format: 'A4', localUrlAccess: true };


        pdf.create(html, options).toFile('/tmp/zzz.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res);
        });


    }



}
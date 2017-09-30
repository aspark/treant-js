const should = require('chai').should();
require('canvas-prebuilt')
const jsdom = require('jsdom');
// var svg = require('svgdom');

const dom = new jsdom.JSDOM('<!doctype html><html><body><div id="chart"></div></body></html>');
global.window = dom.window;
global.document = dom.window.document;


// var HTMLUnknownElement = require('jsdom/lib/jsdom/living/generated/HTMLUnknownElement')
// console.log('======', HTMLUnknownElement, HTMLUnknownElement.create([],{}), HTMLUnknownElement.prototype)
// var HTMLUnknownElement = require('jsdom/lib/jsdom/living/nodes/HTMLUnknownElement-impl');
// HTMLUnknownElement.prototype.createSVGMatrix = function () {//HTMLUnknownElement
//     return { f: 0, e: 0 };
// };

const $ = require('jquery');
global.Raphael = require('./vendor/raphael.fake');
require('./Treant');

describe('Treant', function () {
    var jsonData = {
        dept: 'D',
        fullName: 'first name',
        children: [
            {
                dept: 'D1', fullName: 'first name', children: [
                    { dept: 'D2', fullName: 'first name' },
                    { dept: 'D2', fullName: 'first name' }
                ]
            },
            {
                dept: 'D2', fullName: 'first name', children: [
                    { dept: 'D21', fullName: 'first name' },
                    { dept: 'D22', fullName: 'first name' },
                    { dept: 'D23', fullName: 'first name' }
                ],
                connectors: {
                    type: 'bCurve',
                    style: {
                        stroke: 'red',
                        'stroke-width': 3
                    }
                }
            },
            {
                dept: 'D3', fullName: 'first name', children: [
                    { dept: 'D31', fullName: 'first name' },
                    { dept: 'D32', fullName: 'first name' },
                    { dept: 'D33', fullName: 'first name' }
                ]
            },
            {
                dept: 'D1', fullName: 'first name', children: [
                    { dept: 'D2', fullName: 'first name' },
                    { dept: 'D2', fullName: 'first name' },
                    { dept: 'D2', fullName: 'first name' }
                ]
            },
            {
                dept: 'D1', fullName: 'first name', children: [
                    { dept: 'D2', fullName: 'first name' }
                ]
            },
            {
                dept: 'D1', fullName: 'first name', children: [
                    { dept: 'D2', fullName: 'first name' }
                ]
            }
        ]
    };

    describe('create by json object', function () {

        let completed = null;

        beforeEach(function () {
            new window.Treant({
                chart: {
                    container: '#chart',
                    callback: {
                        onClickNode: function (node, tree) {
                            completed && completed();
                        },
                        onBeforeCreateNode: function (node) {
                            if (node.children && node.children.length >= 3) {
                                node.stackChildren = true;
                            }
                        },
                        buildNodeFromText: function (node, container) {
                            var html = document.createElement('div');
                            html.className = 'node-main';


                            if (this.id == 2) {
                                // html.className += ' current';
                                container.className += ' current';
                            }

                            var title = node.dept;

                            var p = document.createElement('p');
                            p.className = 'title';
                            p.appendChild(document.createTextNode(title));
                            html.appendChild(p);

                            p = document.createElement('p');
                            p.className = 'content';
                            p.appendChild(document.createTextNode(node.fullName));
                            html.appendChild(p);

                            return html;
                        }
                    }
                },
                nodeStructure: jsonData
            })
        });

        afterEach(function () {
            $('#chart').empty();
        })


        it('has current node?', function () {
            console.log($('#chart .current').length)
            $('#chart .current').length.should.equal(1);
        });

        it('match the json struct', function () {
            $('#chart .node').length.should.equal(20);
        })

        it('test onclick event', function (done) {
            completed = done;
            $('#chart .node:last').trigger('click')
        });
    })
})
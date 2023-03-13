import { LoginFactory } from './greeting.js';
import Clock from './clock.js';
import Quote, { Background } from './quotes.js';
import ToDoFactory from './todo.js';

const bg = new Background();

const greeting = LoginFactory.create();
greeting.init();

const clock = new Clock();
clock.renderClock();

const quote = new Quote();
quote.render();

const todo = ToDoFactory.create(); 
todo.init();
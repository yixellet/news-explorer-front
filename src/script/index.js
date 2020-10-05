import { Header } from '../blocks/header/header';

import '../pages/index.css';
import '../pages/news.css';

const header = new Header(document.querySelector('.header'));
header.setEventListeners();

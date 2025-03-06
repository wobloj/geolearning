import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom';
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
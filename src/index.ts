/**
* START 10-19-2022
*/

import { Server } from "http";
import app from "./server";
import declarations from "./providers/declarations";

declarations();

const PORT: string = process.env.PORT || `4200`;

const server: Server = app.listen(PORT, () => {
    console.log(`Server started to listen on port ${PORT}`);
});


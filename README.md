# Backend Action Plan Generator.

As an action plan creator I need an `APP` to generate and visualize action plans.

<div align="center">
<a href="#tech">Tech Stack |</a>
<a href="#dev">Dev launch |</a>
<a href="#docker">Docker launch |</a>
</div>


<div id="tech"></div>

## Tech Stack

* Typecript
* Docker


<div id="dev"></div>

## Dev launch

To launch the proyect as developer use the following command: 
1. Install the dependencies `npm i`
2. Start the server `npm start`

By doing this the server will be launched on the port `9000`
Be sure that the `.env` variables file exist on the proyect folder


<div id="docker"></div>

## Docker launch

This step is optional, the proyect can be launched in an docker container, for this we need have docker desktop installed and follow the next steps:

1. Initialize docker desktop
2. Execute the following command to generate the image 
    ```
    docker build -f "Dockerfile" -t frontend_image:latest "." 
    ```
3. Execute the following command to launch the image 
    ``` 
    docker run -d -p 8000:8000 --name frontend_container frontend_image
    ```

4. Verify that the API is running on: `http://localhost:8000`

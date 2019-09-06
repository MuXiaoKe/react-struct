import "./index.css";
let func = str => {
    document.getElementById("app").innerHTML = str;
};
func("i use ts!");

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept();
}

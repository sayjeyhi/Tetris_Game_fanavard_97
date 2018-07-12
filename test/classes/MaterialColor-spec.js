import MaterialColor from "../../src/javascript/classes/MaterialColor";



describe("MaterialColor: shows random colors",function(){
    it("getRandomColor method should randomly return a valid color",function(){
        expect(/^#[0-9A-F]{6}$/i.test(MaterialColor.getRandomColor())).toBeTruthy()
    })
})
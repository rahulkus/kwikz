var myExtObject = (function() {
    return {
        func1: function(t, bId, mID) {

        // Get the modal
        var modal = document.getElementById(mID);
            
        // Get the button that opens the modal
        var btn = document.getElementById(bId);

        // When the user clicks on the button, open the modal 
        if (t === true ){
            modal.style.display = "block"; 
        }


        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    },

    func2: function(c, bId, mID){
        // Get the modal
        var modal = document.getElementById(mID);        

        // Get the <span> element that closes the modal
        var span1 = document.getElementsByClassName("close");
        console.log(span1);        

        // When the user clicks on <span> (x), close the modal
        if (c === true) {
            modal.style.display = "none";
        }
        
    }
}

})(myExtObject||{})
$fn = 5;
txt = "Türstopper";                       // Stempeltext
schriftgroesse = 6;            
schriftart ="Bahnschrift:style=Regular";

translate([0,0,20.5])rotate([180,0,0])union(){
    difference(){
            import("top_full.stl");
        union(){
            translate([-19,-19,17])linear_extrude( height = 4 )
        text(
        text = txt, 
        size = schriftgroesse, 
        font = schriftart, 
        valign = "center", 
        halign = "center"   
                    ); 
        
    translate([-25,0,17])linear_extrude( height = 4 )
        text(
        text = "X", 
        size = 10, 
        font = schriftart, 
        valign = "center", 
        halign = "center"   
                    );
translate([0,-0.5,0])union(){
union(){
    translate([30.5,24.9,17])linear_extrude( height = 4 )
        text(
        text = "L", 
        size = 5, 
        font = schriftart, 
        valign = "center", 
        halign = "center"   
                    );
    rotate([0,0,180])translate([-32,-25,17])linear_extrude( height = 4 )text(
        text = "L", 
        size = 5, 
        font = schriftart, 
        valign = "center", 
        halign = "center"   
                    );
    rotate([0,0,180])translate([-33,-26,17])linear_extrude( height = 4 )text(
        text = "L", 
        size = 5, 
        font = schriftart, 
        valign = "center", 
        halign = "center"   
                    );
     }
 translate([25,25,19])cube([4,1,4],center = true);
rotate([0,0,45])union(){
      translate([45,-9.5,19])cube([5,1,4],center = true);
    translate([45,-9.5,19])cube([1,5,4],center = true);
}
}
    }
   }
   
    



translate([-18.05, -20, 19])cube([0.5,7,3],center = true);
translate([-14.2, -20, 19])cube([0.5,7,3],center = true);
translate([-9.73, -20, 19])cube([0.5,7,3],center = true);
translate([-4.75, -19, 19])cube([0.5,2,3],center = true);
}

//import("bottom.stl");  

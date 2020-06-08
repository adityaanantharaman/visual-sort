var arr=[];
var size;
var gap;
var bar_width;
var sorts;

var ii;
var jj;
var smallii;
var ss=0;
var bs=0;
var curr_sort=0;

function setup_init()
{
    sorts=["SELECTION SORT","BUBBLE SORT"];
    size=50;
    gap=5;
    bar_width=width/size-6;
    for(let i=0;i<size;i++)
        arr.push(random(10,height-30));
    
    
}

function setup() {
  // put setup code here
    createCanvas(windowWidth-4,windowHeight-4);
    setup_init();
    
    
    b1=createButton("RESET");
    b1.position(200,10);
    b1.mouseClicked(reset);
    
    s1=createSlider(3,60,25,1);
    s1.position(60,10);
    
    sel=createSelect();
    sel.position(380,10);
    sel.option("selection sort");
    sel.option("bubble sort");
    sel.changed(changeSort);
}

function windowResized() {
  resizeCanvas(windowWidth-4, windowHeight-4);
  setup_init();
  reset();
}

function reset()
{
    ss=0;
    bs=0;
    arr=[];
    for(let i=0;i<size;i++)
        arr.push(random(10,height-30));
}
function changeSort()
{
    if(sel.value()=="selection sort")
        curr_sort=0;
    else if(sel.value()=="bubble sort")
        curr_sort=1;
    reset();
}

function ss_show()
{
    stroke(255,0,0);
    strokeWeight(1);
    fill(100,50,255);
    for(let i=0;i<size;i++)
        {
            if(i==jj)
                fill(0,255,255);
            else if(i==ii)
                fill(255,0,0);
            else if(i==smallii)
                fill(0,255,0);
            else fill(100,50,255);
            rect(20+i*(bar_width+gap),height-arr[i],bar_width,arr[i]);   
        }
         
}

function ss_init()
{
    ii=0;
    jj=0;
    smallii=0;
}

function ss_step()
{
    if(ii<size)
        {
            if(arr[jj]<arr[smallii])
                {
                    smallii=jj;
                }
            
            if(jj==size)
                {
                    let temp=arr[smallii];
                    arr[smallii]=arr[ii];
                    arr[ii]=temp;
                    ii++;
                    jj=ii;
                    smallii=jj;
                }
            jj++;
        }
}

function bs_init()
{
    ii=0;
    jj=0;
}
function bs_show()
{
    stroke(255,0,0);
    strokeWeight(1);
    fill(100,50,255);
    for(let i=0;i<size;i++)
        {
            if(i==jj)
                fill(255,0,255);
            else
                fill(100,50,255);
            rect(20+i*(bar_width+gap),height-arr[i],bar_width,arr[i]);   
        }
}
function bs_step()
{
    if(ii<size)
        {
            if(arr[jj+1]<arr[jj])
                {
                    let t=arr[jj+1];
                    arr[jj+1]=arr[jj];
                    arr[jj]=t;
                }
            jj++;
            if(jj==size-ii-1)
                {
                    jj=0;
                    ii++;
                }
            
        }
}

function draw() {
  // put drawing code here
    background(0);
    fill(255);
    text("SPEED",10,25);
    text(sorts[curr_sort],260,24);
    frameRate(s1.value());
    switch(curr_sort)
        {
            case(0):
            {
                ss_show();
                if(ss==0)
                {
                    ss=1;
                    ss_init();
                }
                ss_step();
                break;
            }
            case(1):
            {
                bs_show();
                if(bs==0)
                    {
                        bs=1;
                        bs_init();
                    }
                bs_step();
            }     
        }
}
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

function setup_init(s)
{
    size=s;
    gap=5;
    bar_width=width/size-6;
    for(let i=0;i<size;i++)
        arr.push(random(20,height-30));
    
    
}

function setup() {
  // put setup code here
    createCanvas(windowWidth,windowHeight);
    
    if(width<500)
      setup_init(30);
    else
      setup_init(50);
    
    
    b1=createButton("RESET");
    b1.position(150,35);
    b1.mouseClicked(reset);
    
    s1=createSlider(3,60,25,1);
    s1.position(70,6);
    
    sel=createSelect();
    sel.position(10,35);
    sel.option("SELECTION SORT");
    sel.option("BUBBLE SORT");
    sel.changed(changeSort);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(width<500)
      setup_init(30);
  else
      setup_init(50);
  reset();
}

function reset()
{
    ss=0;
    bs=0;
    arr=[];
    for(let i=0;i<size;i++)
        arr.push(random(20,height-30));
}
function changeSort()
{
    if(sel.value()=="SELECTION SORT")
        curr_sort=0;
    else if(sel.value()=="BUBBLE SORT")
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
            {
                stroke(color('#40bad5'));
                 fill(color('#40bad5'));   
            }
            else if(i==ii)
                {
                 stroke(color('#d92027'));
                 fill(color('#d92027'));   
                }
            else if(i==smallii)
                {
                stroke(color('#35d0ba'));
                fill(color('#35d0ba'));
                }
            else
            {
                stroke(color('#035aa6'));
                fill(color('#035aa6'));
            }
            rect(15+i*(bar_width+gap),height-arr[i],bar_width,arr[i]);   
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
               {
               fill(color('#fcbf1e'));
               stroke(color('#fcbf1e'));
               }
                
            else
                {
                    fill(color('#035aa6'));
                    stroke(color('#035aa6'));
                }
                
            rect(15+i*(bar_width+gap),height-arr[i],bar_width,arr[i]);   
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
    background(color('#120136'));
    fill(255,100,100);
    stroke(255,100,100);
    text("SPEED",15,20);
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
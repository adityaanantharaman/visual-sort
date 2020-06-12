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
var qs=0;
var hs=0;
var curr_sort=0;

var qs_stack=[];
var whatqsdo=0;
var fast,slow;
var sorted_by_qs=[];

var downing,mainheapify,hsmax,whathsdo;

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
    
    s1=createSlider(1,60,25,1);
    s1.position(70,6);
    
    sel=createSelect();
    sel.position(10,35);
    sel.option("SELECTION SORT");
    sel.option("BUBBLE SORT");
    sel.option("QUICK SORT");
    sel.option("HEAP SORT");
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
    qs=0;
    hs=0;
    arr=[];
    sorted_by_qs=[];
    for(let i=0;i<size;i++)
        arr.push(random(20,height-30));
}
function changeSort()
{
    if(sel.value()=="SELECTION SORT")
        curr_sort=0;
    else if(sel.value()=="BUBBLE SORT")
        curr_sort=1;
    else if(sel.value()=="QUICK SORT")
        curr_sort=2;
    else if(sel.value()=="HEAP SORT")
        curr_sort=3;
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
            rect(15+i*(bar_width+gap),height-arr[i],bar_width,arr[i],10);   
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
            else if(i==(size-ii))
               {
               fill(color('#d92027'));
               stroke(color('#d92027'));
               }
            else
                {
                    fill(color('#035aa6'));
                    stroke(color('#035aa6'));
                }
                
            rect(15+i*(bar_width+gap),height-arr[i],bar_width,arr[i],10);   
        }
    
}
function bs_step()
{
    if(ii<size+1)
        {
            if(arr[jj+1]<arr[jj])
                {
                    let t=arr[jj+1];
                    arr[jj+1]=arr[jj];
                    arr[jj]=t;
                }
            jj++;
            if(jj==size-ii)
                {
                    jj=0;
                    ii++;
                }
            
        }
    if(ii==size)
        {
            ii++;
            jj--;
        }
}
function qs_step()
{
    if(whatqsdo==0)
        {
            if(qs_stack.length>0)
                {
                    let p=qs_stack.pop();
                    ii=p[0];
                    jj=p[1];
                    fast=ii;
                    slow=ii;
                    whatqsdo=1;
                }
            else
                {
                    ii=-1;
                    jj=-1;
                    fast=-1;
                    slow=-1;
                }
        }
    if(whatqsdo==1)
        {
            if(arr[fast]<arr[ii])
                {
                    slow++;
                    let temp=arr[slow];
                    arr[slow]=arr[fast];
                    arr[fast]=temp;
                }
            fast++;
            if(fast==jj+1)
                {
                    let temp=arr[ii];
                    arr[ii]=arr[slow];
                    arr[slow]=temp;
                    sorted_by_qs.push(slow);
                    whatqsdo=0;
                    if(slow+1<=jj)
                        qs_stack.push([slow+1,jj]);
                    if(ii<=slow-1)
                        qs_stack.push([ii,slow-1]);
                }
        }
}
function qs_show()
{
    stroke(255,0,0);
    strokeWeight(1);
    fill(100,50,255);
    for(let i=0;i<size;i++)
        {
            if(sorted_by_qs.includes(i))
               {
               fill(color('#fcbf1e'));
               stroke(color('#fcbf1e'));
               }
            else if(i==jj)
               {
               fill(color('#d92027'));
               stroke(color('#d92027'));
               }
            else if(i==ii)
               {
               fill(color('#d92027'));
               stroke(color('#d92027'));
               }
            else if(i==fast)
               {
               fill(color('#40bad5'));
               stroke(color('#40bad5'));
               }
            else
                {
                    fill(color('#035aa6'));
                    stroke(color('#035aa6'));
                }
                
            rect(15+i*(bar_width+gap),height-arr[i],bar_width,arr[i],10);   
        }
    stroke(255);
    strokeWeight(0.3); 
    line(0,height-arr[ii],width,height-arr[ii]);
    if(slow>=0)
    line(18+slow*(bar_width+gap)+bar_width,0,18+slow*(bar_width+gap)+bar_width,height);
}
function qs_init()
{
    qs_stack=[];
    qs_stack.push([0,size-1]);
    whatqsdo=0;
    ii=0;
    jj=0;
    fast=0;
    slow=0;
}

function hs_show()
{
    stroke(255,0,0);
    strokeWeight(1);
    fill(100,50,255);
    for(let i=0;i<size;i++)
        {
            if(whathsdo==0)
                {
                    fill(color('#035aa6'));
                    stroke(color('#035aa6'));
                }
            else
                {
                    if(i<hsmax)
                       {
                           if(downing==0)
                               {
                                   fill(color('#d92027'));
                                    stroke(color('#d92027'));
                               }
                           else
                               {
                                   fill(color('#fcbf1e'));
                                    stroke(color('#fcbf1e'));
                               }
                       }
                    else
                       {
                        fill(color('#035aa6'));
                        stroke(color('#035aa6'));
                       }
                }
            rect(15+i*(bar_width+gap),height-arr[i],bar_width,arr[i],10);   
        }
    fill(255);
}

function hs_init()
{
    downing=0;
    mainheapify=size;
    hsmax=size;
    whathsdo=0;
}
function hs_step()
{
    if(whathsdo==0)
        {
            if(downing==0)
                {
                 downing=1;
                 mainheapify--;
                 heapify=mainheapify;
                 hs_down_step(heapify,size);
                }
            else
                {
                    hs_down_step(heapify,size);
                }
        }
    else if(whathsdo==1)
        {
            if(downing==0)
                {
                    downing=1;
                    hsmax--;
                    let temp=arr[hsmax];
                    arr[hsmax]=arr[0];
                    arr[0]=temp;
                    heapify=0;
                    //hs_down_step(heapify,hsmax);
                }
            else
                {
                    hs_down_step(heapify,hsmax);
                }
        }
}
function hs_down_step(h,newsize)
{
    let lc=h*2+1;
    let rc=lc+1;
    let si=-1;
    if(rc<newsize)
        {
           if(arr[rc]>arr[lc])
               si=rc;
            else
                si=lc;
        }
    else if(lc<newsize)
        {
            si=lc;
        }
    else
        {
            downing=0;
            if(whathsdo==0)
                {
                    if(mainheapify==0)
                        whathsdo=1;
                }
                else if(whathsdo==1)
                    {
                        if(hsmax==0)
                            whathsdo=2;
                    }
        }
    if(si!=-1)
        {
            if(arr[si]>arr[h])
                {
                    let temp=arr[si];
                    arr[si]=arr[h];
                    arr[h]=temp;
                    heapify=si;
                }
            else
                {
                    downing=0;
                    if(whathsdo==0)
                        if(mainheapify==0)
                            whathsdo=1;
                    else if(whathsdo==1)
                        if(hsmax==0)
                            whathsdo=2;
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
                break;
            }
            case(2):
                {
                    if(qs==0)
                        {
                            qs=1;
                            qs_init();
                        }
                    qs_show();
                    qs_step();
                    break;
                }
            case(3):
                {
                    if(hs==0)
                        {
                            hs=1;
                            hs_init();
                        }
                    hs_show();
                    hs_step();
                }
                
        }
}
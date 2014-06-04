from django.http import HttpResponse
from django import template
from django.template import Context
from django.template.loader import get_template
import random, string
import os
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.shortcuts import redirect
from PIL import Image, ImageDraw, ImageFilter
from django.utils.cache import add_never_cache_headers
import urllib2
import StringIO
import re
import shutil
import numpy as np
from scipy import ndimage

#########################################################################
def randomword(length):
   return ''.join(random.choice(string.lowercase) for i in range(length))

##########################################################################
@csrf_exempt
def sharpen(request):
	if request.method == "POST":

	    fl = request.POST['imageData']
        imgstr = re.search(r'base64,(.*)', fl).group(1)
        output = open("temptemp.gif", 'wb')
        output.write(imgstr.decode('base64'))
        output.close()
        im = Image.open('temptemp.gif')
        result = im.filter(ImageFilter.SHARPEN)
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img')#.replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        result.save(path)
        return redirect('/')

############################################################################
@csrf_exempt
def median(request):
	if request.method == "POST":

	    fl = request.POST['imageData']
        imgstr = re.search(r'base64,(.*)', fl).group(1)
        output = open("temptemp.gif", 'wb')
        output.write(imgstr.decode('base64'))
        output.close()
        im = Image.open('temptemp.gif')
        result = Image.fromarray(ndimage.median_filter(im, 3))
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img')#.replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        result.save(path)
        return redirect('/')





@csrf_exempt
def upload(request):
	if request.method == "POST":

		path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
		path = os.path.join(path, 'img').replace('\\','/')
		name = str(request.session['id_picture']) + '.jpg'
		path = os.path.join(path, name).replace('\\','/')
		fl = request.FILES['file']
		if str(fl.content_type)[0:5]=='image':
			#return HttpResponse(path)
			f = open(path, 'wr' )
			f.write(fl.read())
			f.close()
			return redirect('/')
		d = {}
		t = get_template("noimage.html")
		c = Context(d)
		html = t.render(c)
		return HttpResponse(html)
##########################################################################

@csrf_exempt
def upload_internet(request):
    if request.method == "POST":
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        url = request.POST['url']
        img = urllib2.urlopen(url).read()
        dat = StringIO.StringIO(img)
        im = Image.open(dat)
        im.save(path,'JPG')
        return redirect('/')

##########################################################################

def home (request):
	if request.method == "GET":
		try:
			id= request.session['id_picture']
		except:
			id = randomword(40)
			request.session['id_picture'] = id
        urls = '/static/img/'+str(id)+'.jpg'
        canvasw = 800
        canvash = 600
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
    	path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        try:
            img = Image.open(path)
            canvasw, canvash = img.size
        except:
            canvasw = 800
            canvash = 600
        d = {'url_img': urls,'canvasw' : canvasw,'canvash' : canvash}
        t = get_template("painter.html")
        c = Context(d)
        html = t.render(c)
        response = HttpResponse(html)
        add_never_cache_headers(response)
        return response
############################################################################

@csrf_exempt
def nw(request):
    if request.method == "POST":
        h = int(request.POST['h'])
        w = int(request.POST['w'])
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
    	path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        image = Image.new("RGB", (w,h), "white")
        draw = ImageDraw.Draw(image)
        image.save(path)
        return redirect('/')
############################################################################
@csrf_exempt
def save(request):
    if request.method == "POST":

        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        fl = request.POST['imageData']
        imgstr = re.search(r'base64,(.*)', fl).group(1)
        output = open(path, 'wb')
        output.write(imgstr.decode('base64'))
        output.close()
        return HttpResponse('Image saved')
############################################################################

def save_as(request):
    if request.method == "GET":

        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        f = open(path, 'rb')
        response = HttpResponse(f, mimetype='img/jpg')
        response['Content-Disposition'] = 'attachment; filename="simple.jpg"'
        return response

#############################################################################
@csrf_exempt
def rotate(request):
    if request.method == "POST":
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        im1 = Image.open(path)
        im2 = im1.rotate(int(request.POST['arg']))
        im2.save(path)
        return redirect('/')
############################################################################
@csrf_exempt
def saved(request):
    if request.method == "POST":

        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) +'save'+ '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        fl = request.POST['imageData']
        imgstr = re.search(r'base64,(.*)', fl).group(1)
        output = open(path, 'wb')
        output.write(imgstr.decode('base64'))
        output.close()
        return HttpResponse('Image saved')
##########################################################################
def undo (request):
    if request.method == "GET":
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path1 = os.path.join(path, name).replace('\\','/')
        name = str(request.session['id_picture']) +'save'+ '.jpg'
        path2 = os.path.join(path, name).replace('\\','/')
        shutil.copy(path2,path1)
        return redirect('/')

#############################################################################
@csrf_exempt
def resize(request):
    if request.method == "POST":
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) + '.jpg'
        path = os.path.join(path, name).replace('\\','/')
        im1 = Image.open(path)
        w = int(request.POST['w'])
        h = int(request.POST['h'])
        im2= im1.resize((w,h))
        im2.save(path)
        return redirect('/')
#############################################################################
@csrf_exempt
def exposure(request):
    if request.method == "POST":
        path = os.path.join(os.path.dirname(__file__), 'static').replace('\\','/')
        path = os.path.join(path, 'img').replace('\\','/')
        name = str(request.session['id_picture']) +'.jpg'
        path = os.path.join(path, name).replace('\\','/')
        fl = request.POST['imageData']
        imgstr = re.search(r'base64,(.*)', fl).group(1)

        im1 = Image.open(StringIO.StringIO(imgstr.decode('base64')))
        w = im1.size[0]
        h = im1.size[1]
        pix = im1.load()
        step = int(request.POST['step'])

        for i in range(int(w)):
            for j in range(int(h)):
                if i<1:
                    continue
                if j < 1:
                    continue
                #return HttpResponse("02")


                rz=0
                gz = 0
                bz = 0
                #return HttpResponse("2")

                try:
                    obz = pix[i,j-step]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass

                try:
                    obz = pix[i,j+step]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass

                try:
                    obz = pix[i,j+step]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass
                try:
                    obz = pix[i-step,j]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass
                try:
                    obz = pix[i+step,j]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass
                try:
                    obz = pix[i-step,j-step]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass
                try:
                    obz = pix[i-step,j+step]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass
                try:
                    obz = pix[i+step,j+step]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass
                try:
                    obz = pix[i+step,j-step]
                    rz += obz[0]
                    gz += obz[1]
                    bz += obz[2]
                except:
                    pass


                rz = rz // (8)
                gz = gz // (8)
                bz = bz // (8)

                pix[i,j] = (rz,gz,bz)



        im1.save(path)


        return HttpResponse('ok')



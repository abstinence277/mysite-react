from django.contrib.auth import authenticate
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
import math
from django.forms import model_to_dict
from app01.test.test import test
from app01 import models
import json
from django.core import serializers
from app01.serializers import User
from app01.shapley import Gen_Shapley,Draw
from app01.survey import Price
from app01.amp import AMP,AMP_shapley
import torch
import numpy as np
def http_response(success, data):
    res = {
        "success": success,
        "payload": data
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

# Create your views here.
# def index(request):
#     return HttpResponse("hello")

# def userlist(request):
#     return render(request,"user_list.html")
#
# def tpl(request):
#     name="christy"
#     roles=["teacher","student"]
#     user_info={"name":"christy","sex":"girl"}
#     return render(request,"tpl.html",{"a":name,"roles":roles,"users":user_info})

# def news(request):
#     import requests
#     headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15'}
#     res = requests.get("http://www.chinaunicom.com.cn/api/article/NewsByIndex/2/2021/11/news",headers=headers)
#     data_list = res.json()
#     #print(data_list)
#     return render(request, "news.html",{"news":data_list})
#
# def req(request):
#     print(request.method)
#     print(request.GET)
#     return redirect("https://www.baidu.com")

# def login(request):
#     if request.method == "GET":
#         return render(request, "login.html")
#     else:
#         print(request.POST)
#         username=request.POST.get("user")
#         password = request.POST.get("psw")
#         if username == "root" and password == "123":
#             return HttpResponse("ok")
#         else:
#             return render(request, "login.html",{"error":"no"})
def login(request):
    username=json.loads(request.body)["username"]
    pwd=json.loads(request.body)["pwd"]
    res = {
        'code': 0,
        'msg': '',
        'data': {}
    }
    user = authenticate(username=username, password=pwd)  # 验证了用户名和密码， 返回User的一个obj
    if user != None:
        res['msg'] = '登陆成功'
        res['code'] = 1
        res['data'] = {'username': username}
        return http_response(True, res)
    else:
        res['msg'] = '用户名或者密码错误，请重新登陆。'
        return http_response(True, res)

def register(request):
    '''
    注册
    :password：密码  username：用户名
    :return:
    '''
    username = json.loads(request.body)["username"]
    pwd = json.loads(request.body)["pwd"]
    res = {
        'code': 0,
        'msg': '',
        'data': {}
    }
    if User.objects.filter(username=username):
        res['msg'] = '用户已存在。'
        res['code'] = 1
        return http_response(True, res)
    User.objects.create(password=make_password(pwd), is_superuser=0, username=username)
    res['code'] = 2
    res['data'] = [username, pwd]
    return http_response(True, res)

def query_iris(request):
    data = serializers.serialize('python', models.TrainIris.objects.all())
    return http_response(True, data)

def query_chess(request):
    data = serializers.serialize('python', models.TrainChess.objects.all())
    return http_response(True, data)

def query_iris_history(request):
    data = serializers.serialize('python', models.IrisHistoryInfo.objects.all())
    return http_response(True, data)

def query_compensation(request):
    dataset = json.loads(request.body)["dataset"]
    idx = json.loads(request.body)["id"]
    bp = json.loads(request.body)["bp"]
    ps = json.loads(request.body)["ps"]
    eps = json.loads(request.body)["eps"]
    sample = json.loads(request.body)["sample"]
    print(json.loads(request.body))
    acc, sv = Gen_Shapley.eval_monte_carlo(dataset, idx, sample)
    models.ShapleyInfo.objects.all().delete()
    price = dict()
    sv_label = []
    for key in sv.keys():
        if sv[key]>0:
            models.ShapleyInfo.objects.create(id=key, shapley=sv[key],status=0)
        if models.IrisHistoryInfo.objects.filter(id=key):
            print()
        else:
            models.IrisHistoryInfo.objects.create(id=key,compensation=0)
        price[key] = bp * sv[key] / acc * pow(math.e, ps * eps)
        sv_label_ = [key, math.fabs(sv[key])]
        if dataset == 'cancer':
            res = models.TrainCancer.objects.get(id=key)
            res = model_to_dict(res)
            sv_label_.append(res['radius_mean'])
            sv_label_.append(res['texture_mean'])
            if sv[key] < 0:
                sv_label_.append('black')
            elif res['diagnosis'] == 0:
                sv_label_.append('green')
            else:
                sv_label_.append('blue')
        elif dataset == 'chess':
            res = models.TrainChess.objects.get(id=key)
            res = model_to_dict(res)
            sv_label_.append(res['arr1'])
            sv_label_.append(res['arr2'])
            if res['label'] == 0:
                sv_label_.append('green')
            else:
                sv_label_.append('blue')
        else:
            res = models.TrainIris.objects.get(id=key)
            res = model_to_dict(res)
            sv_label_.append(res['sepallength'])
            sv_label_.append(res['sepalwidth'])
            if res['label'] == 0:
                sv_label_.append('green')
            else:
                sv_label_.append('blue')
        sv_label_.append((math.fabs(sv[key]) / acc) * 500 * 2)
        sv_label.append(sv_label_)
    # name = Draw.draw(sv_label)

    data = {
        "accuracy": acc,
        "sv": sv,
        "price": price,
        # "name": name
    }

    return http_response(True, data)

def write_survey(request):
    survey = json.loads(request.body)['survey']
    models.SurveyInfo.objects.all().delete()
    for sur in survey:
        models.SurveyInfo.objects.create(eps=sur['eps'], pri=sur['pri'])

    survey_info = Price.get_survey_info()
    complete_price_space = Price.construct_complete_price_space(survey_info)
    max_revenue, price = Price.revenue_maximization(complete_price_space)

    data = {
        "complete_price_space": complete_price_space,
        "max_revenue": max_revenue,
        "price": price
    }

    return http_response(True, data)

def query_amp_shapley(request):
    dataset = json.loads(request.body)["dataset"]
    num_repeats = json.loads(request.body)["num_repeats"]
    shapley_mode = json.loads(request.body)["shapley_mode"]
    epsilon = json.loads(request.body)["epsilon"]
    price = json.loads(request.body)["price"]
    budget = json.loads(request.body)["budget"]
    bp = json.loads(request.body)['bp']
    ps = json.loads(request.body)['ps']
    epsilon_ = sorted(epsilon)
    data,params = AMP_shapley.amp_shapley_main(dataset, shapley_mode, epsilon_, budget, bp, ps, num_repeats)
    temp=-1
    for item in data:
        print("item")
        temp+=1
        for i in range(len(epsilon)):
            if epsilon[i] == item['epsilon']:
                break
        item["price"] = price[i]
        id = models.ModelInfo.objects.all().count()
        obj = models.ModelInfo.objects.create(id=id, dataset=dataset, epsilon=item['epsilon'],
                                              coverage=item['coverage'],
                                              price=item['price'], accuracy=item['accuracy'],state=0)
        path = 'app01/irismodel/' + str(id) + '_irismodel.pth'
        print(path)
        state = {'model': params[temp]}
        torch.save(state, path)
        # state_dict = torch.load(path)
        # temp = state_dict['model']
        item['id'] = obj.id

    return http_response(True, data)

def query_amp_shapley2(request):
    dataset = json.loads(request.body)["dataset"]
    num_repeats = json.loads(request.body)["num_repeats"]
    shapley_mode = json.loads(request.body)["shapley_mode"]
    epsilon = json.loads(request.body)["epsilon"]
    epsilon=[2.5]
    price = json.loads(request.body)["price"]
    budget = json.loads(request.body)["budget"]
    bp = json.loads(request.body)['bp']
    ps = json.loads(request.body)['ps']
    epsilon_ = sorted(epsilon)
    data,params = AMP_shapley.amp_shapley_main2(dataset, shapley_mode, epsilon_, budget, bp, ps, num_repeats)
    return http_response(True, data)

def query_amp(request):
    dataset = json.loads(request.body)["dataset"]
    num_repeats = json.loads(request.body)["num_repeats"]
    epsilon = json.loads(request.body)["epsilon"]
    data = AMP.amp_main(dataset, epsilon, num_repeats)
    return http_response(True, data)

def release_model(request):
    idx = json.loads(request.body)['id']
    models.ModelInfo.objects.filter(id=idx).update(state=1)
    data = serializers.serialize('python', models.ModelInfo.objects.all())
    return http_response(True, data)

def query_limited_model(request):
    dataset = json.loads(request.body)['dataset']
    budget = json.loads(request.body)['budget']
    covexp = json.loads(request.body)['covexp']
    covsen = json.loads(request.body)['covsen']
    noiexp = json.loads(request.body)['noiexp']
    noisen = json.loads(request.body)['noisen']

    model = models.ModelInfo.objects.filter(dataset=dataset, state=1)
    data = []
    for m in model:
        expprice = budget * (1 / (1 + math.pow(math.e, -1 * covsen * (m.coverage - covexp)))) * (
                1 / (1 + math.pow(math.e, -1 * noisen * (m.epsilon - noiexp))))
        print(expprice)
        if expprice >= m.price:
            res = {
                'id': m.id,
                'coverage': m.coverage,
                'epsilon': m.epsilon,
                'price': m.price,
                "suggestion": True
            }
        else:
            res = {
                'id': m.id,
                'coverage': m.coverage,
                'epsilon': m.epsilon,
                'price': m.price,
                "suggestion": False
            }
        data.append(res)

    return http_response(True, data)

def testiris(request):
    length=json.loads(request.body)["length"]
    width=json.loads(request.body)["width"]
    choise=json.loads(request.body)["choice"]
    res = {
        'code': 0,
        'msg': '',
        'data': {}
    }
    print(length,width,choise)
    a=np.append(float(length),float(width))
    print(a)
    path = '/Users/christy277/Downloads/mysite/app01/irismodel/'+str(choise)+'_irismodel.pth'
    state_dict = torch.load(path)
    temp=state_dict['model']
    theta=temp[0]
    ret = test(a,  theta)
    print(ret)
    res['msg'] = '计算成功'
    res['code'] = 1
    res['data'] = {'result': ret}
    return http_response(True, res)
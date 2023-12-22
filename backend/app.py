from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists, create_database
from flask_cors import CORS
from datetime import datetime
import pytz


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@localhost/Tasks'
app.app_context().push()
db = SQLAlchemy(app)
CORS(app)

tz_Brasilia = pytz.timezone('Brazil/East')
datetime_Brasilia = datetime.now(tz_Brasilia)

engine = db.create_engine('postgresql://postgres:123456@localhost/Tasks')
if not database_exists(engine.url): create_database(engine.url)

class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    category = db.Column(db.String(200), nullable=False, default='work')
    date = db.Column(db.String, nullable=False, default=datetime_Brasilia.strftime("%m/%d/%Y, %H:%M:%S"))
    done = db.Column(db.Boolean, nullable=False, default=False)
    
    def __repr__(self):
        return f"Task: {self.title}"
    
    def __init__(self, title, category, description):
        self.title = title
        self.description = description
        self.category = category
        
def task_serializer(task):
    return {
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'category': task.category,
        'date': task.date,
        'done': task.done
    }

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/create_task', methods=['GET', 'POST'])
def create_task():
    title = request.json['title']
    description = request.json['description']
    category = request.json['category']
    task = Tasks(title, category, description)
    db.session.add(task)
    db.session.commit()
    return task_serializer(task)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Tasks.query.order_by(Tasks.id.asc()).all()
    task_list = []
    for task in tasks:
        task_list.append(task_serializer(task))
    return {'tasks': task_list}

@app.route('/tasks/<id>', methods=['GET'])
def get_single_task(id):
    task = Tasks.query.filter_by(id=id).one()
    formated_task = task_serializer(task)
    return {'task': formated_task}

@app.route('/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    task = Tasks.query.filter_by(id=id).one()
    db.session.delete(task)
    db.session.commit()
    return f'Task (id: {id}) deleted!'

@app.route('/tasks/<id>', methods=['PUT'])
def update_task(id):
    task = Tasks.query.filter_by(id=id)
    title = request.json['title']
    description = request.json['description']
    category = request.json['category']
    done = request.json['done']

    task.update(dict(id=id,title=title, description=description,category=category, done=done, date=datetime_Brasilia.strftime("%m/%d/%Y, %H:%M:%S")))
    db.session.commit()
    return {'task': task_serializer(task.one())}

@app.route('/tasks/<id>/complete', methods=['PUT'])
def update_task_complete(id):
    task = Tasks.query.filter_by(id=id)
    formated_task = task_serializer(task.one())
    title = formated_task['title']
    description = formated_task['description']
    category = formated_task['category']
    date = formated_task['date']
    if formated_task['done'] == False:
        done = True
    else:
        done = False
    task.update(dict(id=id,title=title, description=description,category=category, done=done, date=date))
    db.session.commit()
    return {'task': task_serializer(task.one())}


if __name__ == '__main__':
    db.create_all()
    app.run()


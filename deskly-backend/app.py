from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from config import Config
from models import db, User, Client, Task, Project, Transaction, Invoice, TimeEntry

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://improved-computing-machine-69r6x6jv5v4jhq7w-5173.app.github.dev"]}})

db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to Deskly Use /register, /login, or other endpoints to interact.'}), 200

# Authentication Endpoints
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    user = User(email=email, password=password)  # In production, hash the password
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or user.password != password: 
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 200

# Client Endpoints
@app.route('/clients', methods=['GET'])
@jwt_required()
def get_clients():
    user_id = get_jwt_identity()
    clients = Client.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': c.id, 'name': c.name, 'email': c.email} for c in clients]), 200

@app.route('/clients', methods=['POST'])
@jwt_required()
def add_client():
    user_id = get_jwt_identity()
    data = request.get_json()
    client = Client(user_id=user_id, name=data['name'], email=data['email'])
    db.session.add(client)
    db.session.commit()
    return jsonify({'id': client.id, 'name': client.name, 'email': client.email}), 201

@app.route('/clients/<int:id>', methods=['PUT'])
@jwt_required()
def update_client(id):
    user_id = get_jwt_identity()
    client = Client.query.filter_by(id=id, user_id=user_id).first()
    if not client:
        return jsonify({'message': 'Client not found'}), 404
    data = request.get_json()
    client.name = data['name']
    client.email = data['email']
    db.session.commit()
    return jsonify({'id': client.id, 'name': client.name, 'email': client.email}), 200

@app.route('/clients/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_client(id):
    user_id = get_jwt_identity()
    client = Client.query.filter_by(id=id, user_id=user_id).first()
    if not client:
        return jsonify({'message': 'Client not found'}), 404
    db.session.delete(client)
    db.session.commit()
    return jsonify({'message': 'Client deleted'}), 200

# Task Endpoints
@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': t.id,
            'name': t.name,
            'due_date': t.due_date.isoformat(),
            'status': t.status
        } for t in tasks
    ]), 200

@app.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    user_id = get_jwt_identity()
    data = request.get_json()
    task = Task(
        user_id=user_id,
        name=data['name'],
        due_date=datetime.strptime(data['due_date'], '%Y-%m-%d').date(),
        status=data['status']
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({
        'id': task.id,
        'name': task.name,
        'due_date': task.due_date.isoformat(),
        'status': task.status
    }), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
@jwt_required()
def update_task(id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=id, user_id=user_id).first()
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    data = request.get_json()
    task.name = data['name']
    task.due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date()
    task.status = data['status']
    db.session.commit()
    return jsonify({
        'id': task.id,
        'name': task.name,
        'due_date': task.due_date.isoformat(),
        'status': task.status
    }), 200

@app.route('/tasks/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=id, user_id=user_id).first()
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'}), 200

# Project Endpoints
@app.route('/projects', methods=['GET'])
@jwt_required()
def get_projects():
    user_id = get_jwt_identity()
    projects = Project.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': p.id,
            'name': p.name,
            'client': p.client,
            'deadline': p.deadline.isoformat(),
            'tasks': p.tasks.split(',') if p.tasks else []
        } for p in projects
    ]), 200

@app.route('/projects', methods=['POST'])
@jwt_required()
def add_project():
    user_id = get_jwt_identity()
    data = request.get_json()
    project = Project(
        user_id=user_id,
        name=data['name'],
        client=data['client'],
        deadline=datetime.strptime(data['deadline'], '%Y-%m-%d').date(),
        tasks=','.join(map(str, data['tasks'])) if data['tasks'] else ''
    )
    db.session.add(project)
    db.session.commit()
    return jsonify({
        'id': project.id,
        'name': project.name,
        'client': project.client,
        'deadline': project.deadline.isoformat(),
        'tasks': project.tasks.split(',') if project.tasks else []
    }), 201

@app.route('/projects/<int:id>', methods=['PUT'])
@jwt_required()
def update_project(id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=id, user_id=user_id).first()
    if not project:
        return jsonify({'message': 'Project not found'}), 404
    data = request.get_json()
    project.name = data['name']
    project.client = data['client']
    project.deadline = datetime.strptime(data['deadline'], '%Y-%m-%d').date()
    project.tasks = ','.join(map(str, data['tasks'])) if data['tasks'] else ''
    db.session.commit()
    return jsonify({
        'id': project.id,
        'name': project.name,
        'client': project.client,
        'deadline': project.deadline.isoformat(),
        'tasks': project.tasks.split(',') if project.tasks else []
    }), 200

@app.route('/projects/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project(id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=id, user_id=user_id).first()
    if not project:
        return jsonify({'message': 'Project not found'}), 404
    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': 'Project deleted'}), 200

# Transaction Endpoints
@app.route('/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': t.id,
            'date': t.date.isoformat(),
            'description': t.description,
            'amount': t.amount,
            'type': t.type,
            'project': t.project
        } for t in transactions
    ]), 200

@app.route('/transactions', methods=['POST'])
@jwt_required()
def add_transaction():
    user_id = get_jwt_identity()
    data = request.get_json()
    transaction = Transaction(
        user_id=user_id,
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        description=data['description'],
        amount=float(data['amount']),
        type=data['type'],
        project=data['project']
    )
    db.session.add(transaction)
    db.session.commit()
    return jsonify({
        'id': transaction.id,
        'date': transaction.date.isoformat(),
        'description': transaction.description,
        'amount': transaction.amount,
        'type': transaction.type,
        'project': transaction.project
    }), 201

# Invoice Endpoints
@app.route('/invoices', methods=['GET'])
@jwt_required()
def get_invoices():
    user_id = get_jwt_identity()
    invoices = Invoice.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': i.id,
            'project': i.project,
            'amount': i.amount,
            'due_date': i.due_date.isoformat(),
            'description': i.description
        } for i in invoices
    ]), 200

@app.route('/invoices', methods=['POST'])
@jwt_required()
def add_invoice():
    user_id = get_jwt_identity()
    data = request.get_json()
    invoice = Invoice(
        user_id=user_id,
        project=data['project'],
        amount=float(data['amount']),
        due_date=datetime.strptime(data['due_date'], '%Y-%m-%d').date(),
        description=data['description']
    )
    db.session.add(invoice)
    db.session.commit()
    return jsonify({
        'id': invoice.id,
        'project': invoice.project,
        'amount': invoice.amount,
        'due_date': invoice.due_date.isoformat(),
        'description': invoice.description
    }), 201

# Time Entry Endpoints
@app.route('/time-entries', methods=['GET'])
@jwt_required()
def get_time_entries():
    user_id = get_jwt_identity()
    entries = TimeEntry.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': e.id,
            'task': e.task,
            'date': e.date.isoformat(),
            'duration': e.duration,
            'notes': e.notes
        } for e in entries
    ]), 200

@app.route('/time-entries', methods=['POST'])
@jwt_required()
def add_time_entry():
    user_id = get_jwt_identity()
    data = request.get_json()
    entry = TimeEntry(
        user_id=user_id,
        task=data['task'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        duration=float(data['duration']),
        notes=data['notes']
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({
        'id': entry.id,
        'task': entry.task,
        'date': entry.date.isoformat(),
        'duration': entry.duration,
        'notes': entry.notes
    }), 201

@app.route('/time-entries/<int:id>', methods=['PUT'])
@jwt_required()
def update_time_entry(id):
    user_id = get_jwt_identity()
    entry = TimeEntry.query.filter_by(id=id, user_id=user_id).first()
    if not entry:
        return jsonify({'message': 'Time entry not found'}), 404
    data = request.get_json()
    entry.task = data['task']
    entry.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    entry.duration = float(data['duration'])
    entry.notes = data['notes']
    db.session.commit()
    return jsonify({
        'id': entry.id,
        'task': entry.task,
        'date': entry.date.isoformat(),
        'duration': entry.duration,
        'notes': entry.notes
    }), 200

@app.route('/time-entries/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_time_entry(id):
    user_id = get_jwt_identity()
    entry = TimeEntry.query.filter_by(id=id, user_id=user_id).first()
    if not entry:
        return jsonify({'message': 'Time entry not found'}), 404
    db.session.delete(entry)
    db.session.commit()
    return jsonify({'message': 'Time entry deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
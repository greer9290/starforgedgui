import tkinter as tk
from tkinter import ttk
import json

# Load the JSON data
def load_data():
    try:
         with open('dataforged.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("JSON file not found.")
    except json.JSONDecodeError:
        print("Invalid JSON data.")
    except Exception as e:
        print(f"Error loading data: {str(e)}")

# Create the main window
window = tk.Tk()
window.title("Ironsworn: Starforged Data Explorer")

# Create a notebook (tabbed interface)
notebook = ttk.Notebook(window)
notebook.pack(fill=tk.BOTH, expand=True)

# Load the data
data = load_data()

# Function to create a treeview for a specific data type
def create_treeview(parent, data_type):
    treeview = ttk.Treeview(parent)
    treeview.pack(fill=tk.BOTH, expand=True)

    # Define columns based on the data type
    if data_type == "Asset Types":
        treeview["columns"] = ("Name", "Description")
    elif data_type == "Oracle Categories":
        treeview["columns"] = ("Name", "Description")
    elif data_type == "Move Categories":
        treeview["columns"] = ("Name", "Description")
    # Add more conditions for other data types

    # Configure column headings
    treeview.heading("#0", text="ID")
    treeview.heading("Name", text="Name")
    treeview.heading("Description", text="Description")

    # Insert data into the treeview
    for item in data[data_type]:
        treeview.insert("", tk.END, text=item["$id"], values=(item["Name"], item.get("Description", "")))

    return treeview

# Function to display details of a selected item
def display_details(data_type, item_id):
    item = next((item for item in data[data_type] if item["$id"] == item_id), None)
    if item:
        details_window = tk.Toplevel(treeview)
        details_window.title(f"{data_type} Details")

        # Display item details
        id_label = ttk.Label(details_window, text=f"ID: {item['$id']}")
        id_label.pack()

        name_label = ttk.Label(details_window, text=f"Name: {item['Name']}")
        name_label.pack()

        if "Description" in item:
            description_label = ttk.Label(details_window, text=f"Description: {item['Description']}")
            description_label.pack()

        # Add more labels for other item properties

# Function to handle item selection
def on_item_selected(event, data_type):
    selected_item = event.widget.selection()[0]
    item_id = event.widget.item(selected_item, "text")
    display_details(data_type, item_id)

# Create tabs for different data types
asset_types_tab = ttk.Frame(notebook)
notebook.add(asset_types_tab, text="Asset Types")

asset_types_treeview = create_treeview(asset_types_tab, "Asset Types")
asset_types_treeview.bind("<<TreeviewSelect>>", lambda event: on_item_selected(event, "Asset Types"))

oracle_categories_tab = ttk.Frame(notebook)
notebook.add(oracle_categories_tab, text="Oracle Categories")

oracle_categories_treeview = create_treeview(oracle_categories_tab, "Oracle Categories")
oracle_categories_treeview.bind("<<TreeviewSelect>>", lambda event: on_item_selected(event, "Oracle Categories"))

move_categories_tab = ttk.Frame(notebook)
notebook.add(move_categories_tab, text="Move Categories")

move_categories_treeview = create_treeview(move_categories_tab, "Move Categories")
move_categories_treeview.bind("<<TreeviewSelect>>", lambda event: on_item_selected(event, "Move Categories"))

# Create treeviews for each data type




# Run the main event loop
window.mainloop()
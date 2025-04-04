import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/api';

interface Category {
  _id: string;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      setError('Failed to fetch categories');
      console.error(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    try {
      const response = await categoryService.create({ name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory('');
      setError('');
    } catch (error: any) {
      if (error.response?.data?.error === 'Category name already exists') {
        setError('Category name already exists');
      } else {
        setError('Failed to create category');
      }
      console.error(error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    if (!editingCategory.name.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    try {
      const response = await categoryService.update(editingCategory._id, {
        name: editingCategory.name
      });
      setCategories(categories.map(cat => 
        cat._id === editingCategory._id ? response.data : cat
      ));
      setEditingCategory(null);
      setError('');
    } catch (error: any) {
      if (error.response?.data?.error === 'Category name already exists') {
        setError('Category name already exists');
      } else {
        setError('Failed to update category');
      }
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await categoryService.delete(id);
      setCategories(categories.filter(cat => cat._id !== id));
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('Cannot delete category that has products');
      } else {
        setError('Failed to delete category');
      }
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create Category Form */}
      <form onSubmit={handleCreate} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category._id} className="flex items-center justify-between p-2 border rounded">
            {editingCategory?._id === category._id ? (
              <form onSubmit={handleUpdate} className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span>{category.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;